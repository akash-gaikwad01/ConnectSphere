import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import ProfilePage from './Pages/ProfilePage'

const App = () => {
  return (
    <div className="bg-[url('./src/assets/chat-app-assets/bgImage.svg')] 
    bg -contain">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
