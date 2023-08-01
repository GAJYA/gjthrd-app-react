import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useEffect, useState, ReactElement } from 'react'
import Dashboard from '@/views/Dashboard'
import LayoutWrapper from '@/components/Layout'
import ManuscriptPtoject from '@/views/ManuscriptProject'
import { Skeleton } from 'antd'
import './App.css'
import { checkLogin } from '@/api/user'

function Home(): ReactElement {
  return (
    <div>
      <ManuscriptPtoject />
    </div>
  )
}

function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Skeleton active />
    </div>
  )
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState({ userName: '' })

  useEffect(() => {
    checkLogin()
      .then((response) => {
        const { data } = response.data
        setLoggedIn(true)
        setUserInfo(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [loggedIn])
  return loggedIn ? (
    <Router initialEntries={['/']}>
      <Routes>
        <Route path="/loading" element={<Loading />} />
        <Route path="/" element={<LayoutWrapper user={userInfo} />}>
          <Route index element={<Home />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="about" element={<div>About</div>} />
        </Route>
      </Routes>
    </Router>
  ) : (
    <Loading />
  )
}
