import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import PropTypes from 'prop-types'

function ArtisanHeader ({ attributes }) {
  const picturl =
    `${process.env.REACT_APP_BASE_URL}` + attributes.profilePicture?.data?.attributes?.url

  return (
    <div className='flex flex-col items-center'>
      <Card className='flex flex-col items-center w-1/2'>
        <CardHeader className='flex flex-col items-center font-semibold'>
          <h1>{attributes.name}</h1>
        </CardHeader>
        <CardBody className='w-80'>
          <img src={picturl} className='artisan-pp' />
        </CardBody>
        <CardFooter className='flex text-center'>
          <p>{attributes.description}</p>
        </CardFooter>
      </Card>
    </div>
  )
}

ArtisanHeader.propTypes = {
  attributes: PropTypes.object
}

export default ArtisanHeader
