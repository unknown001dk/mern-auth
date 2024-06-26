import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Profile from './pages/Profile'
import Error from './pages/Error'
import Header from './components/Header'
import PrivateRoute from './components/privateRoute'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />} >
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App