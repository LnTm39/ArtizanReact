import Header from './components/header/Header'
import Router from './navigation/Router'
import { NextUIProvider } from '@nextui-org/react'
import { AuthProvider } from './contexts/authContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App () {
  return (
    <>
      <NextUIProvider>
        <AuthProvider>
          <ToastContainer />
          <Header />
          <Router />
        </AuthProvider>
      </NextUIProvider>
    </>
  )
}

export default App
