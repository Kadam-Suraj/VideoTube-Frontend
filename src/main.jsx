import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/theme_provider'
import { Toaster } from "@/components/ui/toaster"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { AuthProvider } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Video from './pages/Video'
import User from './pages/User'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/watch/:videoId' element={<Video />} />
      <Route path='/:username' element={<User />} />


      {/* Protected Routes */}
      <Route path='/user-profile' element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
