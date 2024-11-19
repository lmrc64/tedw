"use client";

import SEO from "@/components/SEO";

import StoreHeading from "@/components/home/StoreHeading";
import ProductListings from "@/components/home/ProductListings";

function IndexPage({ products }) {
  return (
    <div className="mx-auto max-w-6xl">
      <SEO title={process.env.siteTitle} />
      <StoreHeading />
      <ProductListings products={products} />
    </div>
  );
}

export default IndexPage;
