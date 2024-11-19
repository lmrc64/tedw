"use client";

import SEO from "@/components/SEO";
import PageTitle from "@/components/home/PageTitle";
import CartTable from "@/components/cart/CartTable";
import CheckOutButton from "@/components/cart/CheckOutButton";
import BackToProductButton from "@/components/products/BackToProductButton";
import { useCartContext } from "@/context/Store";

function CartPage() {
  const pageTitle = `Cart | ${process.env.siteTitle}`;
  const { cart, isLoading } = useCartContext();

  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <SEO title={pageTitle} />
      <PageTitle text="Your Cart" />
      <CartTable />
      <div className="max-w-sm mx-auto space-y-4 px-2">
        <CheckOutButton />
        <br></br>
        <BackToProductButton />
      </div>
    </div>
  );
}

export default CartPage;
