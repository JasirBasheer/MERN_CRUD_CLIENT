import { Navigate, Route, Routes } from 'react-router-dom'
import AdminSignin from './pages/admin/Signin'
import Home from './pages/user/Home'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import ProtectedRoute from './pages/user/ProtectedRoute'
import Profile from './pages/user/Profile'
import Dashboard from './pages/admin/Dashboard'
import AdminProtectedRoute from './pages/admin/AdminProtectedRoute'

const App = () => {
  return (
    <Routes>
      <Route path='*' element={<Navigate to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path='/admin/login' element={<AdminSignin />} />
      <Route path='/admin/' element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
    </Routes>
  )
}


export default App