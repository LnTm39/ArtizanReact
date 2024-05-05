import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/Api'
import ArtisanHeader from '../components/Artisan/ArtisanHeader.Jsx'

import ProductsList from '../components/Products/ProductsList'

function Artisan () {
  const { artisanSlug } = useParams()
  const { response, error, loading } = useFetch(
    `/artisans?filters[slug][$eq]=${artisanSlug}&populate=*`
  )
  const { response: products, error: productsError, loading: productsLoading } = useFetch(
        `/produits?filters[artisan][slug][$eq]=${artisanSlug}&populate=*`
  )
  if (loading || productsLoading) return <h1>Chargement...</h1>
  if (error || productsError) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return response && (
    <>
      <ArtisanHeader attributes={response[0]?.attributes} />
      {
            products
              ? (
                <ProductsList products={products} />
                )
              : <p>Aucun produit trouvé</p>
        }
    </>
  )
}

export default Artisan
