import { Card, CardBody, CardHeader } from '@nextui-org/react'
import PropTypes from 'prop-types'

function ProductsListItem ({ product }) {
  const { name, description, pictures, price } = product.attributes
  const urls = []
  pictures.data.forEach((picture, i) => {
    const url = picture?.attributes?.url
    urls[i] = process.env.REACT_APP_BASE_URL + url
  })

  return (
    <Card className='w-80'>
      <CardHeader>
        <h3 className='text-center'>{name}</h3>
      </CardHeader>
      <CardBody>
        <img className='rounded-lg' src={urls[0]} />
        <p className='product-price text-center'>{price} €</p>
        <p className='product-desc'>{description}</p>
      </CardBody>
    </Card>
  )
}

ProductsListItem.propTypes = {
  product: PropTypes.object.isRequired
}
export default ProductsListItem
