/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Tabs } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login, loginWithQRCode, checkLogin } from '@/api/user'
import '@/mock/index'

// 假设这是你的登录API

const { TabPane } = Tabs

export default function Login() {
  const [form] = Form.useForm()
  const [activeKey, setActiveKey] = useState('password')

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

  useEffect(() => {
    checkLogin()
      .then((response) => {
        // eslint-disable-next-line no-debugger
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
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
        <TabPane tab="二维码" key="qrcode">
          <div id="wx_reg" />
        </TabPane>
      </Tabs>
    </div>
  )
}
