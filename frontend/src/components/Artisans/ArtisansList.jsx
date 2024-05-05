import PropTypes from 'prop-types'
import ArtisansListItem from './ArtisansListItem'

function ArtisansList ({ artisans }) {
  if (!artisans || artisans.length < 1) {
    return 'No data !'
  }
  return (
    <>
      <div className='flex flex-col gap-4 items-center justify-center'>
        <h2>Liste d&apos;Artisans</h2>
        <div className='flex flex-row'>
          {
            artisans.map(art => (
              <ArtisansListItem key={art.id} artisan={art} />
            ))
          }
        </div>
      </div>
    </>
  )
}

ArtisansList.propTypes = {
  artisans: PropTypes.arrayOf(PropTypes.object)
}
export default ArtisansList
