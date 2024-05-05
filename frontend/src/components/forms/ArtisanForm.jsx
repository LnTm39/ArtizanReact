import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'

import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/authContext'
// import { createArtisan, uploadPicture } from '../../services/api'
import axios from 'axios'

function ArtisanForm () {
  const { error, loading, state: { user, jwt } } = useAuth()

  const userData = {
    username: user.username,
    email: user.email,
    password: user.password,
    isArtisan: true
  }

  const [formData, setFormData] = useState({
    name: 'Ewen le Développeur',
    description: 'Dev en alternance',
    profilePicture: '',
    slug: '',
    produits: [],
    user: user.id
  })

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]
    setFormData({
      ...formData,
      profilePicture: file
    })
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      const generateSlug = name => name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-')
      const mySlug = generateSlug(formData.name)
      const formDataWithPicture = new FormData()
      if (formData.profilePicture) {
        formDataWithPicture.append('files.profilePicture', formData.profilePicture)
      }
      formDataWithPicture.append('data', JSON.stringify({
        name: formData.name,
        description: formData.description,
        user: formData.user,
        isArtisan: formData.isArtisan,
        slug: mySlug
      }))

      const response = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/artisans`,
        data: formDataWithPicture,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + jwt
        }
      })
      if (response.status === 200) {
        toast.success('Artisan créé avec succès')
      } else {
        toast.error(`Failed to create artisan: ${response.statusText}`)
      }

      const userResponse = await axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}/users/${user.id}`,
        data: userData,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt
        }
      })
      if (userResponse.status === 200) {
        toast.success('Profil mis a jour')
        window.location.reload() // Recharger la page pour voir les changements
      } else {
        toast.error(`Failed to update user: ${userResponse.statusText}`)
      }
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error)
      toast.error('Une erreur est survenue lors de la soumission du formulaire.')
    }
  }

  return (
    <form className='flex flex-col gap-2 p-5'>
      <Input
        type='text'
        name='name'
        label="Nom d'artisan : "
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        name='description'
        label='Description : '
        value={formData.description}
        onChange={handleChange}
        required
      />
      <p>Photo de profil : </p>
      <input
        className='file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0'
        type='file'
        name='profilePicture'
        accept='image/*'
        onChange={handleFileInputChange}
        required
      />
      {
        error && <p style={{ color: 'red' }}>{error}</p>
      }
      <Button isLoading={loading} type='submit' onClick={handleSubmit}>
        S'enregistrer
      </Button>
    </form>
  )
}
export default ArtisanForm
