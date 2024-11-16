'use client';
import { useEffect, useState } from 'react';
import ProductSection from '@/components/products/ProductSection';
import { useParams } from 'next/navigation';

function ProductPage() {
  const params = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  const productId = params?.id;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:3005/api/v1/products/${productId}`);
        if (!res.ok) {
          throw new Error('Error al obtener el producto');
        }
        const data = await res.json();
        setProductData(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) return <p>Loading...</p>;

  if (!productData) return <p>Producto no encontrado</p>;

  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <ProductSection productData={productData} />
    </div>
  );
}

export default ProductPage;
