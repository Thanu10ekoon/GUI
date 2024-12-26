import React from 'react'
import Login from './Login'
import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import Home from './Home'
import Dashboard from './Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/GUI/' element={<Home/>}></Route>
        <Route path='/GUI/signup' element={<Signup/>}></Route>
        <Route path='/GUI/login' element={<Login/>}></Route>
        <Route path='/GUI/home' element={<Home />}></Route>
        <Route path='/GUI/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
