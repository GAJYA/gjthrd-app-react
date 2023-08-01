// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

export type Channels = 'ipc-example'

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args)
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => func(...args)
      ipcRenderer.on(channel, subscription)

      return () => {
        ipcRenderer.removeListener(channel, subscription)
      }
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args))
    },
  },
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  setTitle: (title: string) => ipcRenderer.send('set-title', title), // 修改标题
  openFile: () => ipcRenderer.invoke('dialog:openFile'), // 打开文件获取文件地址
  handleCounter: (callback: any) => ipcRenderer.on('update-counter', callback), // 原生操作系统菜单控制的数字计数器
  handleRedirect: (callback: any) => ipcRenderer.on('redirect-uri', callback), // 监听到重定向的行为后
  openUrl: (url: string) => ipcRenderer.send('openUrl', url), // 监听到重定向的行为后
  setCookie: (cookie: any) => ipcRenderer.send('setCookie', cookie),
  logOut: (userName: String) => ipcRenderer.send('logOut', userName),
}

contextBridge.exposeInMainWorld('electron', electronHandler)

export type ElectronHandler = typeof electronHandler
