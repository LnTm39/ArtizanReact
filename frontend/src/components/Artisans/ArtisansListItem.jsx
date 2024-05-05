import { Card, CardBody, CardHeader, Link } from '@nextui-org/react'
import PropTypes from 'prop-types'

function ArtisansListItem ({ artisan }) {
  const { name, slug, description, profilePicture } = artisan.attributes
  const picturl =
    `${process.env.REACT_APP_BASE_URL}` + profilePicture?.data?.attributes?.url

  return (
    <>
      <Card className='m-3 p-3'>
        <CardHeader className='flex flex-col '>
          <img className='w-40' src={picturl} />
          <h3 className='author-name'>{name}</h3>
        </CardHeader>
        <CardBody as={Link} href={`/artisans/${slug} `}>
          Voir les articles
        </CardBody>
        <p>{description}</p>
      </Card>
    </>
  )
}

ArtisansListItem.propTypes = {
  artisan: PropTypes.object
}
export default ArtisansListItem
