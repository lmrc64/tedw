import { useState } from 'react'
import BackToProductButton from '@/components/BackToProductButton'
import ProductInfo from '@/components/ProductInfo'
import ProductForm from '@/components/ProductForm'

function ProductDetails({ productData }) {

  return (
    <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
      <BackToProductButton />
      <ProductInfo 
        title={productData.title}
        description={productData.description}
      />
      <ProductForm 
        title={productData.title}
        handle={productData.handle}
        variants={productData.variants.edges} 
        mainImg="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg"
        setVariantPrice="100"
      />
    </div>
  )
}

export default ProductDetails
