import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Services from '../pages/Services'
import Contact from '../pages/Contact'
import Artisans from '../pages/Artisans'
import Home from '../pages/Home'
import Artisan from '../pages/Artisan'
import Auth from '../pages/Auth'
import PrivateRoutes from './PrivateRouteMiddleware'
import Dashboard from '../pages/protected/Dashboard'
import Register from '../pages/Register'
import MonShop from '../pages/protected/MonShop'

function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='artisans'> {/* route nested */}
          <Route index element={<Artisans />} />
          <Route path=':artisanSlug' element={<Artisan />} />
        </Route>
        <Route path='authentication' element={<Auth />} />
        <Route path='register' element={<Register />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='services' element={<Services />} />
        <Route path='dashboard' element={<PrivateRoutes />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path='mon-shop' element={<PrivateRoutes />}>
          <Route index element={<MonShop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default Router
