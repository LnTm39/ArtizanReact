import PropTypes from 'prop-types'
import ProductsManagerItem from './ProductsManagerItem'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import ProductForm from '../forms/ProductForm'

function ProductsManager ({ artisanId, products }) {
  const [showAddProduct, setShowAddProduct] = useState(true)

  const handleShowAddProduct = () => {
    setShowAddProduct(!showAddProduct)
  }

  return (
    <div className='flex flex-col p-5'>
      <div className='flex flex-row justify-center h-96'>
        {
          showAddProduct
            ? (
              <a onClick={handleShowAddProduct}>
                <Card className='w-80 h-full'>
                  <CardHeader className='flex flex-row justify-center'>
                    <h3>Ajouter un produit</h3>
                  </CardHeader>
                  <CardBody className='flex flex-row justify-center'>
                    <PlusIcon className='w-10' />
                  </CardBody>
                </Card>
              </a>)
            : (
              <div className='flex flex-row justify-center'>
                <ProductForm artisanId={artisanId} onCancel={handleShowAddProduct} />
              </div>)
        }
      </div>
      <h2 className='flex justify-center p-3 w-full font-semibold'>Liste de vos produits</h2>
      {products && products.length > 0
        ? (
          <div className='flex flex-row flex-wrap justify-center gap-5 py-3 px-20 w-full'>
            {
              products.map(prod => (
                <ProductsManagerItem key={prod.id} product={prod} />
              ))
            }
          </div>
          )
        : (
          <p className='text-center text-gray-600'>Aucun produit trouvé.</p>
          )}
    </div>
  )
}
ProductsManager.propTypes = {
  artisanId: PropTypes.number,
  products: PropTypes.array
}
export default ProductsManager
