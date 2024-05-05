import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { useState } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { createProduit } from '../../services/api'
import { useAuth } from '../../contexts/authContext'
import axios from 'axios'

function ProductForm ({ onCancel, artisanId }) {
  const { state: { jwt } } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pictures: [],
    price: '',
    artisan: artisanId
  })

  const [fileFormData, setFileFormData] = useState(new FormData())

  const handleFileInputChange = (event) => {
    const files = event.target.files
    if (files.length) {
      const updatedFileFormData = new FormData()
      Array.from(files).forEach(file => {
        updatedFileFormData.append('files', file)
      })
      setFileFormData(updatedFileFormData)
    }
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
      let imageIds = []
      if (fileFormData.has('files')) {
        const uploadResponse = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, fileFormData, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        imageIds = uploadResponse.data.map(file => file.id)
      }

      const productData = {
        data: {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          pictures: imageIds,
          artisan: formData.artisan
        }
      }

      const response = await createProduit(productData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        toast.success('Produit créé avec succès')
      } else {
        toast.error(`Failed to create product: ${response.statusText}`)
      }
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error)
      toast.error('Une erreur est survenue lors de la soumission du formulaire.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className='w-80 h-full'>
        <CardHeader className='flex flex-row justify-around'>
          <Button color='success' onClick={handleSubmit}>Ajouter un produit</Button>
          <Button color='danger' isIconOnly onClick={onCancel}>
            <XCircleIcon className='w-5' />
          </Button>
        </CardHeader>
        <CardBody className='flex flex-col justify-center gap-1'>
          <Input
            type='text'
            name='name'
            label='Nom de produit : '
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type='text'
            name='description'
            label='Description : '
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Input
            type='number'
            name='price'
            label='Prix : '
            value={formData.price}
            onChange={handleChange}
            required
          />
          <p className='text-xs pl-4'>Photo:</p>
          <input
            className='file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0'
            type='file'
            name='pictures'
            accept='image/*'
            onChange={handleFileInputChange}
            required
          />
        </CardBody>
      </Card>
    </form>
  )
}

ProductForm.propTypes = {
  onCancel: PropTypes.func,
  artisanId: PropTypes.number
}

export default ProductForm
