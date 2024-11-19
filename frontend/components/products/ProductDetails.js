import { useState } from "react";
import BackToProductButton from "@/components/products/BackToProductButton";
import ProductInfo from "@/components/ProductInfo";
import ProductForm from "@/components/products/ProductForm";

function ProductDetails({ productData }) {
  return (
    <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
      <BackToProductButton />
      <ProductInfo
        title={productData.product.name}
        description={productData.product.description}
        price={productData.product.price}
      />
      <ProductForm
        id={productData.product._id}
        title={productData.product.name}
        price={productData.product.price}
        mainImg={productData.product.image[0]}
      />
    </div>
  );
}

export default ProductDetails;
