import { Card, CardBody, CardFooter, CardHeader, Link } from '@nextui-org/react'
import PropTypes from 'prop-types'

function ProductsHome ({ product }) {
  const { name, description, pictures, price, artisan } = product.attributes
  const urls = []
  pictures.data.forEach((picture, i) => {
    const url = picture?.attributes?.url
    urls[i] = process.env.REACT_APP_BASE_URL + url
  })
  const artiButes = artisan.data?.attributes
  const ppLink = artiButes.profilePicture.data.attributes.formats.thumbnail.url
  const ppURL = process.env.REACT_APP_BASE_URL + ppLink

  return (
    <Card className='w-80'>
      <CardHeader>
        <h3 className='font-semibold text-center'>{name}</h3>
      </CardHeader>
      <CardBody className='flex items-center'>
        <img className='h-80 rounded-lg' src={urls[0]} />
        <p className='product-desc'>{description}</p>
      </CardBody>
      <CardFooter as={Link} href={`/artisans/${artiButes.slug} `}>
        <img src={ppURL} className='w-16 rounded-full' />
        <p className='font-semibold indent-20'>{price} €</p>
      </CardFooter>
    </Card>
  )
}

ProductsHome.propTypes = {
  product: PropTypes.object.isRequired
}
export default ProductsHome
