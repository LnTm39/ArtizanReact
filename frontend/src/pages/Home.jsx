import ProductsList from '../components/Products/ProductsList'
import { useFetch } from '../hooks/Api'

function Home () {
  const { response, error, isLoading } = useFetch('/produits?populate[0]=artisan.profilePicture&populate[1]=artisan.slug&populate[2]=pictures')
  if (isLoading) return <h1>Chargement...</h1>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  return (
    <div className='flex flex-row justify-center items-center'>
      <h1>Home</h1>
      {
      response
        ? (
          <ProductsList products={response} isHome />
          )
        : <p>Aucun produit trouvé</p>
      }
    </div>
  )
}

export default Home
