import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'
import './App.css'

function Home() {
  return (
    <div>
      <header>
        <h2>
          <Link to="/dashboard">Dashboard</Link> | <Link to="/about">About</Link>
        </h2>
      </header>
      <div>
        <Login />
      </div>
      <footer className="Hello">
        <a
          href="https://ibd-test.gjzqth.com/user/login?redirect=%2Flogin&bypassword=1"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">跳转登录页面</button>
        </a>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <Router initialEntries={['/home']}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </Router>
  )
}
