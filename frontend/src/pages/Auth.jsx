import { useEffect } from 'react'
import LoginForm from '../components/forms/LoginForm'
import { useAuth } from '../contexts/authContext'
import { useNavigate } from 'react-router-dom'

function Auth () {
  const navigate = useNavigate()

  const { state: { isLoggedIn } } = useAuth()

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard')
  })

  return (
    <div className='flex flex-col items-center'>
      <LoginForm />
      <a href='/register' className='m-2' color='primary-50'>Je n'ai pas de compte</a>
    </div>
  )
}

export default Auth
