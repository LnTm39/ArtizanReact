import { useEffect, useState } from 'react'

import { validateRegisterForm } from '../../services/formAuthValidation'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/authContext'
import { Button, Input } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

function RegisterForm () {
  /* Version simple mais repetitive:
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('') */

  const navigate = useNavigate()
  const { error, register, loading, state: { user, jwt } } = useAuth()

  const [formData, setFormData] = useState({
    email: 'ewenheas13@gmail.com',
    username: 'Ewen',
    password: 'COUCOU'
  })

  const [errors, setErrors] = useState({
    email: null,
    username: null,
    password: null
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  useEffect(() => {
    if (user && jwt) {
      navigate('/dashboard')
    }
  }, [user])

  const handleSubmit = (event) => {
    event.preventDefault()
    const _errors = validateRegisterForm(formData)
    if (_errors) {
      setErrors(_errors)
    }
    toast.info(`Formulaire soumis : ${formData.username}`)
    register(formData)
  }

  return (
    <form className='flex flex-col gap-2'>
      <Input
        type='email'
        name='email'
        label='Email : '
        placeholder='Entrez votre Email'
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <Input
        name='username'
        label='Pseudo : '
        placeholder='Entrez votre pseudo'
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        required
      />
      <Input
        type='password'
        name='password'
        label='Mot de passe : '
        placeholder='Entrez votre mot de passe'
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
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

export default RegisterForm
