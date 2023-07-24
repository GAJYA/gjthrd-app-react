import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from 'antd'

export default function Dashboard() {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const setTitle = () => {
    window.electron.setTitle(inputValue || 'Electron App')
  }

  return (
    <div>
      <header>
        <h2>
          <Link to="/home">Home</Link> | <Link to="/about">About</Link>
        </h2>
      </header>
      <div>Dashboard</div>
      <div>
        <Input placeholder="标题名" onChange={handleInputChange} />
        <Button type="primary" onClick={setTitle}>
          修改标题
        </Button>
      </div>
    </div>
  )
}
