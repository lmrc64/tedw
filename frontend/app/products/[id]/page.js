"use client"
import ProductSection from '@/components/ProductSection';

function ProductPage() {
  // Datos estáticos simulados para un producto
  const productData = {
    title: "Producto Estático",
    description: "Esta es una descripción estática de ejemplo para un producto.",
    price: 50,
    images: {
      src: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg",
      alt: "Imagen del producto"
    },
    variants: [
      { id: 1, title: "Variante A", price: 50 },
      { id: 2, title: "Variante B", price: 60 }
    ]
  };

  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <ProductSection productData={productData} />
    </div>
  );
}

export default ProductPage;
