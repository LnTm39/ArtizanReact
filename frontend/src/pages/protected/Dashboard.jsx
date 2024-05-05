import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { Button } from '@nextui-org/react'
import { useFetchHeaders } from '../../hooks/Api'
import ArtisanProfile from '../../components/Artisan/ArtisanProfile'
import UserProfile from '../../components/User/UserProfile'
import { useState } from 'react'
import ArtisanForm from '../../components/forms/ArtisanForm'

function Dashboard () {
  const navigate = useNavigate()
  const { logout, state: { user } } = useAuth()
  const { response } = useFetchHeaders('/users/me?populate=artisan.profilePicture')
  const [showArtisanForm, setShowArtisanForm] = useState(false)

  let isArtisan = false
  let artisan = {}
  if (response) {
    isArtisan = response.isArtisan
    artisan = response.artisan
  }
  const handleLogout = () => {
    logout()
    navigate('/authentication')
  }
  const createArtisan = () => {
    setShowArtisanForm(true)
  }
  return (
    <div className='flex flex-col items-center gap-6'>
      <h1>Profil de {user.username}</h1>
      {isArtisan
        ? (
          <div className='flex flex-col items-center'>
            <ArtisanProfile artisan={artisan} />
            <UserProfile user={user} />
          </div>)
        : (
          <div className='flex flex-col items-center'>
            <UserProfile user={user} />
            {
              showArtisanForm
                ? <ArtisanForm />
                : <Button onClick={createArtisan}>Devenir Artisan</Button>
            }
          </div>
          )}
      <Button onClick={handleLogout}>Se déconnecter</Button>
    </div>
  )
}

export default Dashboard
