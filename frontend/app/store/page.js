"use client";

import React, { useContext, useEffect } from "react";
import { CategoryContext } from "./layout";
import SEO from "@/components/SEO";
import StoreHeading from "@/components/home/StoreHeading";
import ProductListings from "@/components/home/ProductListings";

function IndexPage() {
  const { selectedCategory } = useContext(CategoryContext);

  useEffect(() => {
  }, [selectedCategory]);

  return (
    <div className="mx-auto max-w-6xl">
      <SEO title={process.env.siteTitle} />
      <StoreHeading />
      <ProductListings category={selectedCategory} />
    </div>
  );
}

export default IndexPage;
