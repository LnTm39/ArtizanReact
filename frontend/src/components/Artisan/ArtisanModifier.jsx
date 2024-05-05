import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import PropTypes from 'prop-types'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { updateArtisan } from '../../services/api'
import { useAuth } from '../../contexts/authContext'

function ArtisanModifier ({ artisan, products, userId }) {
  const picture = artisan.profilePicture
  const pictUrl = `${process.env.REACT_APP_BASE_URL}` + picture?.url
  const pictureId = picture?.id

  const { state: { jwt } } = useAuth()

  const finalProducts = []
  products.forEach(product => {
    finalProducts.push(product.id)
  })

  const [isEditing, setIsEditing] = useState(false)

  const toggleEditing = () => {
    setIsEditing(!isEditing)
  }

  const [formData, setFormData] = useState({
    name: artisan.name,
    description: artisan.description,
    profilePicture: pictureId,
    slug: artisan.slug,
    produits: finalProducts,
    user: userId
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const saveChanges = (event) => {
    event.preventDefault()
    setIsEditing(false)
    updateArtisan({
      data: formData
    }, artisan.id,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt
      }
    })
  }

  return (
    <div className='flex flex-col items-center'>
      <Card className='flex flex-col items-center w-1/2'>
        <CardHeader className='flex flex-row justify-center font-semibold'>
          {isEditing
            ? (
              <div className='flex flex-col items-center gap-3'>
                <input
                  type='text'
                  value={formData.name}
                  name='name'
                  onChange={handleChange}
                />
                <input
                  type='text'
                  value={formData.slug}
                  name='slug'
                  onChange={handleChange}
                />
              </div>
              )
            : (
              <>
                <h1>{artisan.name}</h1>
                <Button onClick={toggleEditing}>
                  <PencilSquareIcon className='w-5' />
                </Button>
              </>
              )}
        </CardHeader>
        <CardBody className='w-80'>
          <img src={pictUrl} alt='Profile' className='artisan-pp' />
        </CardBody>
        <CardFooter className='flex flex-row justify-center text-center'>
          {
            isEditing
              ? (
                <textarea
                  value={formData.description}
                  className='w-11/12'
                  onChange={handleChange}
                  rows={4}
                />
                )
              : (
                <>
                  <p>{artisan.description}</p>
                </>
                )
            }
        </CardFooter>
        {isEditing && (
          <Button className='p-3 m-3' onClick={saveChanges}>Save Changes</Button>
        )}
      </Card>
    </div>
  )
}

ArtisanModifier.propTypes = {
  artisan: PropTypes.object,
  products: PropTypes.array,
  userId: PropTypes.number
}

export default ArtisanModifier
