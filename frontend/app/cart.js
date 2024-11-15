"use client";


import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'
import CartTable from '@/components/CartTable'
import CheckOutButton from '@/components/CheckOutButton'
import BackToProductButton from '@/components/BackToProductButton'
import { useCartContext } from '@/context/Store'

function CartPage() {
  const pageTitle = `Cart | ${process.env.siteTitle}`  

  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <SEO title={pageTitle} />
      <PageTitle text="Your Cart" />
      <CartTable 
      />
      <div className="max-w-sm mx-auto space-y-4 px-2">
        <CheckOutButton />
        <BackToProductButton />
      </div>

    </div>
  )
}

export default CartPage
