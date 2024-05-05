import PropTypes from 'prop-types'
import ProductsListItem from './ProductsListItem'
import ProductsHome from './ProductsHome'

function ProductsList ({ products, isHome = false }) {
  return (
    <>
      <div className='flex flex-col'>
        <h2 className='flex justify-center p-3 w-full font-semibold'>Liste de produits</h2>
        <div className='flex flex-row flex-wrap justify-center gap-5 py-3 px-20 w-full'>
          {
            products.map(prod => (
              isHome ? <ProductsHome key={prod.id} product={prod} /> : <ProductsListItem key={prod.id} product={prod} />
            ))
          }
        </div>
      </div>
    </>
  )
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  isHome: PropTypes.bool
}
export default ProductsList
