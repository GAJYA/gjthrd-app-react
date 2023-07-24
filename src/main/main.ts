/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path'
import { app, BrowserWindow, shell, ipcMain, Tray, Menu, BrowserView } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import MenuBuilder from './menu'
import { resolveHtmlPath } from './util'

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info'
    autoUpdater.logger = log
    autoUpdater.checkForUpdatesAndNotify()
  }
}

const iconPath = path.join(__dirname, '../../assets/icon.png')
let mainWindow: BrowserWindow | null = null
let tray: Tray

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`
  console.log(msgTemplate(arg))
  event.reply('ipc-example', msgTemplate('pong'))
})

// 设置标题
ipcMain.on('set-title', (event, title) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win?.setTitle(title)
})

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

const isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'

if (isDebug) {
  require('electron-debug')()
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS']

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log)
}

const createWindow = async () => {
  if (isDebug) {
    await installExtensions()
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets')

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths)
  }

  mainWindow = new BrowserWindow({
    // frame: false, // 设置无边框窗口
    // titleBarStyle: 'hidden', // 隐藏标题栏
    // titleBarOverlay: true,
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged ? path.join(__dirname, 'preload.js') : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  })

  // 创建窗口时启动重定向的监听
  mainWindow.webContents.on('will-navigate', (e, url) => {
    console.log('Redirect:', url)
    // 此处'https://ibd.gjzq.cn/user/login?qywx=1'应该会存服务器，通过接口调用获取
    if (url.startsWith('https://ibd-test.gjzqth.com/user/login?qywx=1')) {
      e.preventDefault() // 阻止导航
      mainWindow?.webContents.send('redirect-uri', '/dashboard')
    }
  })

  mainWindow.loadURL(resolveHtmlPath('index.html'))

  tray = new Tray(iconPath) // 实例化一个tray对象，构造函数的唯一参数是需要在托盘中显示的图标url

  tray.setToolTip('底稿上传工具') // 鼠标移到托盘中应用程序的图标上时，显示的文本

  tray.on('click', () => {
    // 点击图标的响应事件，这里是切换主窗口的显示和隐藏
    if (mainWindow?.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow?.show()
    }
  })

  tray.on('right-click', () => {
    // 右键点击图标时，出现的菜单，通过Menu.buildFromTemplate定制，这里只包含退出程序的选项。
    const menuConfig = Menu.buildFromTemplate([
      {
        label: '退出',
        click: () => app.quit(),
      },
    ])
    tray.popUpContextMenu(menuConfig)
  })

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize()
    } else {
      mainWindow.show()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 自定义菜单
  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()
  // 去掉菜单栏
  // mainWindow.removeMenu()

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url)
    return { action: 'allow' }
  })
  // 嵌入页面
  const view = new BrowserView()
  mainWindow.setBrowserView(view)
  // view.setBounds({ x: 0, y: 0, width: 1024, height: 728 })
  // view.webContents.loadURL('https://ibd-test.gjzqth.com/user/login')

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater()
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 开机自启
if (app.isPackaged) {
  app.setLoginItemSettings({ openAtLogin: true })
}

app
  .whenReady()
  .then(() => {
    createWindow()
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow()
    })
  })
  .catch(console.log)
