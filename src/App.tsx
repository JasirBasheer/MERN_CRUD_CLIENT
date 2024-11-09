import { Route, Routes } from 'react-router-dom'
import AdminSignin from './pages/admin/Signin'
import Home from './pages/user/Home'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import ProtectedRoute from './pages/user/ProtectedRoute'
import { Provider } from 'react-redux'
import store from './redux/app/store'
import Profile from './pages/user/Profile'
import Dashboard from './pages/admin/Dashboard'
import AdminProtectedRoute from './pages/admin/AdminProtectedRoute'

const App = () => {
  return (
    <Provider store={store}>
   <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
    <Route path='/admin/login' element={<AdminSignin/>}/>
    <Route path='/admin/dashboard' element={<AdminProtectedRoute><Dashboard/></AdminProtectedRoute>}/>
   </Routes>
    </Provider>
  )
}

export default App