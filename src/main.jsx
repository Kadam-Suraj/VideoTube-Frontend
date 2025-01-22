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
import ProtectedRoute from './context/ProtectedRoute'
import Video from './pages/Video'
import User from './pages/User'
import SearchResults from './pages/SearchResults'
import Error from './pages/Error'
import WatchHistory from './pages/WatchHistory'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Unprotected Routes */}
      <Route index element={<Home />} />
      <Route path="/user/:username" element={<User />} />
      <Route path="/login" element={<Login />} />
      <Route path="/watch" element={<Video />} />
      <Route path="/results" element={<SearchResults />} />

      {/* Protected Routes */}
      <Route path="/user-profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/history" element={
        <ProtectedRoute>
          <WatchHistory />
        </ProtectedRoute>
      } />

      {/* temp routes until development completes */}
      <Route path="/collections" element={
        <ProtectedRoute>
          <Error code={503} />
        </ProtectedRoute>
      } />
      <Route path="/subscribers" element={
        <ProtectedRoute>
          <Error code={503} />
        </ProtectedRoute>
      } />
      <Route path="/support" element={
        <ProtectedRoute>
          <Error code={503} />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Error code={503} />
        </ProtectedRoute>
      } />

      {/* Catch-All Route */}
      <Route path="*" element={<Error />} />
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
