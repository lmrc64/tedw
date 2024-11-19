"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/home/ProductCard";

export default function ProductListings() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:3005/api/v1/products");
        if (!res.ok) throw new Error("Error al obtener los productos");

        const data = await res.json();
        const productsArray = data.products || [];
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!Array.isArray(products) || products.length === 0)
    return <p>No hay productos disponibles.</p>;

  return (
    <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
