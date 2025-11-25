import React, { useState } from 'react'
import Layouts from './Components/Layouts'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import Login from './Components/Login'

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div>
      <Header onToggleSidebar={toggleSidebar}/>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <Layouts />
    </div>
  )
}

export default App
