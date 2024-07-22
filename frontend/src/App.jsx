import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/login' element={ <Login /> } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
