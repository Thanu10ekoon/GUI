// App.js
import React from 'react'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Dashboard from './Dashboard'
import Record from './Record'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/GUI/' element={<Home />} />
        <Route path='/GUI/signup' element={<Signup />} />
        <Route path='/GUI/login' element={<Login />} />
        <Route path='/GUI/home' element={<Home />} />
        <Route path='/GUI/dashboard' element={<Dashboard />} />
        <Route path='/GUI/record' element={<Record />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
