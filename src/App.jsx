// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import { Header } from './elements/Header'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Homepage } from './pages/Homepage'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Login />} />
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/homepage' element={<Homepage />} />
      </Routes>

    </>

  )
}

export default App
