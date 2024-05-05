import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function ArtisanProfile ({ artisan }) {
  const url = artisan.profilePicture?.url
  const picturl = `${process.env.REACT_APP_BASE_URL}` + url
  const navigate = useNavigate()
  const shoplink = () => {
    navigate(`/artisans/${artisan.slug}`)
  }
  const modifyShopLink = () => {
    navigate('/mon-shop')
  }
  return (
    <Card className='flex flex-col items-center'>
      <CardHeader className='flex flex-col items-center font-semibold'>
        Votre profil d'artisan :
        <h1>{artisan.name}</h1>
      </CardHeader>
      <CardBody className='w-80'>
        <img src={picturl} className='artisan-pp rounded-md' />
      </CardBody>
      <CardFooter className='flex flex-col text-center gap-4 p-8'>
        <p>{artisan.description}</p>
        <Button onClick={shoplink}>Voir mon shop</Button>
        <Button onClick={modifyShopLink}>
          Modifier mon Shop
          <PencilSquareIcon className='w-5' />
        </Button>
      </CardFooter>
    </Card>
  )
}
ArtisanProfile.propTypes = {
  artisan: PropTypes.object
}
export default ArtisanProfile
