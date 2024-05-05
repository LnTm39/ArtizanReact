import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'

function PrivateRoutes () {
  const { state: { user, jwt } } = useAuth()
  return (jwt && user ? <Outlet /> : <Navigate to='/authentication' />)
}

export default PrivateRoutes
