import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/dashboard' element={ <Dashboard /> } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
