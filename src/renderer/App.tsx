import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from '@/views/Login'
import './App.css'

function Hello() {
  return (
    <div>
      <div>
        <Login />
      </div>
      <div className="Hello">
        <a
          href="https://ibd-test.gjzqth.com/user/login?redirect=%2Flogin&bypassword=1"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">跳转登录页面</button>
        </a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  )
}
