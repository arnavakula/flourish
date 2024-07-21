import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </>
  )
}

export default App
