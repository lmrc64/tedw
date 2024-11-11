import StoreHeading from '@/components/StoreHeading'
import ProductListings from '@/components/ProductListings'
import { getAllProductsInCollection } from '@/lib/shopify'

function IndexPage({ products }) {

  return (
    <div className="mx-auto max-w-6xl">
      <StoreHeading />
      <ProductListings products={products} />      
    </div>
  )
}


export default IndexPage
