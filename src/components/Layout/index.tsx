import React from 'react'
import { PieChartOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme, Avatar, Button, Col, Row } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import './index.css'

const { Header, Content, Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('项目底稿', '/', <PieChartOutlined />),
  getItem('上传文件', '/dashboard'),
  getItem('关于', '/about'),
]

// 头像
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

interface LayoutProps {
  user: {
    userName: string
  }
}

export default function LayoutWrapper({ user }: LayoutProps) {
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken()
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
    console.log('click ', e)
  }

  // 设置随机颜色
  const randomIndex = Math.floor(Math.random() * ColorList.length)
  const color = ColorList[randomIndex]

  // 退出登录
  const logout = () => {
    window.electron.logOut(user.userName)
  }

  return (
    <Layout>
      <Header style={{ borderBottom: '1px solid #ccc', alignItems: 'center', background: colorBgContainer }}>
        <Row>
          <Col flex="auto">底稿上传工具</Col>
          <Col flex="100px">
            <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }} size="large">
              {user.userName.split('')[0] || <UserOutlined />}
            </Avatar>
            <Button type="link" size="small" style={{ marginRight: '5px', verticalAlign: 'middle' }} onClick={logout}>
              登出
            </Button>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer, borderRight: `1px solid ${colorBorderSecondary}` }}>
          <Menu onClick={onClick} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" items={items} />
        </Sider>
        <Layout style={{ padding: '10px' }}>
          <Content
            style={{
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet /> {/* 这里将渲染子路由的内容 */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
