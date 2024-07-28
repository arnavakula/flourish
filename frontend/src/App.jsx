import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import YourPlants from './components/YourPlants';
import AllPlants from './components/AllPlants';
import Community from './components/Community';
import ViewPosts from './components/ViewPosts';
import CreatePost from './components/CreatePost';


function App() {
  return (
    <>
    <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/dashboard' element={ <Dashboard /> }>
              <Route index element={<Navigate to="your-plants" replace />} />
              <Route path='your-plants' element={ <YourPlants /> } />
              <Route path='calendar' element={ <YourPlants /> } />
              <Route path='popular' element={ <YourPlants /> } />
              <Route path='all-plants' element={ <AllPlants /> } />
              <Route path='community' element={ <Community /> }>
                <Route index element={<Navigate to="view?sort=all" replace />} />
                <Route path='view' element={ <ViewPosts /> } />
                <Route path='create' element={ <CreatePost /> }/>
                <Route path='*' element={<Navigate to="view?sort=all" replace />} />
              </Route>
              <Route path='*' element={ <Navigate to="your-plants" replace /> } />
            </Route>
            
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
