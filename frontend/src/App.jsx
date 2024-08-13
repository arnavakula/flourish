import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import YourGarden from './components/YourGarden';
import Community from './components/Community';
import ViewPosts from './components/ViewPosts';
import CreatePost from './components/CreatePost';
import ViewSinglePost from './components/ViewSinglePost';
import GardenCalendar from './components/GardenCalendar';


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
              <Route path='your-garden' element={ <YourGarden /> }>
                <Route index element={ <GardenCalendar /> }/>
                <Route path='list-view' />
              </Route>
              <Route path='calendar' element={ <YourGarden /> } />
              <Route path='popular' element={ <YourGarden /> } />
              <Route path='community' element={ <Community /> }>
                <Route index element={<Navigate to="view?sort=all" replace />} />
                <Route path='view' element={ <ViewPosts /> } />
                <Route path='create' element={ <CreatePost /> }/>
                <Route path='post/:postId' element={ <ViewSinglePost /> }/>
                <Route path='*' element={<Navigate to="view?sort=all" replace />} />
              </Route>
              <Route path='*' element={ <Navigate to="your-garden" replace /> } />
            </Route>
            
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
