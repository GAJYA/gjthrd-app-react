/* eslint-disable promise/always-return */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Tabs } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login, loginWithQRCode, wxLogin, checkLogin } from '@/api/user'
import '@/mock/index'

// 假设这是你的登录API

const { TabPane } = Tabs

const APPID = 'wwe407a9efde1708d9'

export default function Login() {
  const [form] = Form.useForm()
  const [activeKey, setActiveKey] = useState('qrcode')
  const navigate = useNavigate()

  const handleLogin = (values: any) => {
    if (activeKey === 'password') {
      console.log('用户名密码登录', values)
      // 调用接口
      login(values)
    } else {
      console.log('二维码登录', values)
      // 调用接口
      loginWithQRCode()
    }
  }

  window.electron.handleRedirect((event: any) => console.log('handleRedirect', event))

  const handleRedirectUri = (code: string) => {
    console.log(window.electron.handleRedirect)
    window.electron.handleRedirect((event: any, value: any) => {
      console.log('navigate redirect', value)
      navigate(value)
      const param = {
        code,
        qywx: '1',
        appid: APPID,
        state: 'undefined',
      }
      checkLogin(param)
        .then((response) => {
          // handle success
          console.log(response)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    })
  }

  // 监听函数
  const handleMessage = (event: { origin: any; data: string }) => {
    console.log(event, 'event 22222222222222222')
    const { origin } = event
    console.log('event.origin', event.origin)
    if (origin === 'https://open.work.weixin.qq.com') {
      console.log('event.data', event.data)
      const query = event.data.split('?')[1]
      console.log('query:', query)
      const params = new URLSearchParams(query)

      const code = params.get('code')
      // eslint-disable-next-line no-debugger
      debugger
      if (query) {
        handleRedirectUri(code || '')
      }
    }
  }

  const setTitle = () => {
    window.electron.setTitle('随便设置')
  }

  console.log('wxLogin: ', wxLogin)
  const WwLogin = wxLogin()
  useEffect(() => {
    // 创建扫码监听事件，需要在不用的时候进行清除
    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener('message', handleMessage, false)
    }
    // eslint-disable-next-line no-new
    new WwLogin({
      id: 'wx_reg',
      appid: 'wwe407a9efde1708d9',
      agentid: '1000007',
      redirect_uri: 'https://ibd-test.gjzqth.com/user/login?qywx=1',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <TabPane tab="二维码" key="qrcode">
          <div id="wx_reg" />
          <Button type="primary" onClick={setTitle}>
            修改标题
          </Button>
        </TabPane>
        <TabPane tab="用户名密码" key="password">
          <Form form={form} onFinish={handleLogin} initialValues={{ username: '', password: '' }}>
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input prefix={<UserOutlined />} placeholder="用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  )
}
