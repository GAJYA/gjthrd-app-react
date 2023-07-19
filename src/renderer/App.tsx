import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import icon from '../../assets/icon.svg'
import './App.css'

function Hello() {
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>底稿上传工具</h1>
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
