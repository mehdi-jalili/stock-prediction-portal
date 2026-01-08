// فایل: src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Register from './components/Register'
import Main from './components/Main'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AuthProvider from './AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* صفحه اصلی - برای همه قابل دسترسی */}
            <Route path="/" element={<Main />} />
            
            {/* صفحات ثبت‌نام و لاگین - فقط برای کاربران لاگ‌اوت شده */}
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            
            {/* داشبورد - فقط برای کاربران لاگین شده */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App