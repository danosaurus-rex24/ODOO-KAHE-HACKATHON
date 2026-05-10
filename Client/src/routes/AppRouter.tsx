import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import Trips from '../pages/Trips'
import Budget from '../pages/Budget'
import Profile from '../pages/Profile'
import MainLayout from '../layouts/MainLayout'

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/trips" element={<MainLayout><Trips /></MainLayout>} />
        <Route path="/budget" element={<MainLayout><Budget /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter