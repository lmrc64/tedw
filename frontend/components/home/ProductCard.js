import Image from "next/image";
import Link from "next/link";
import Price from "@/components/Price";

function ProductCard({ product }) {
  return (
    <Link
      href={`/store/products/${product._id}`}
      className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter"
    >
      <div className="h-72 border-b-2 border-palette-lighter relative">
        <Image
          src={product.image[0] || "/default-image.jpg"}
          alt={product.name}
          layout="fill"
          className="transform duration-500 ease-in-out hover:scale-110 object-cover"
        />
      </div>

      {/* Información del producto */}
      <div className="h-48 relative p-4">
        <h2 className="font-primary text-palette-primary text-2xl font-semibold">
          {product.name}
        </h2>
        <p className="text-lg text-gray-600 font-primary font-light">
          {product.description}
        </p>
        <div className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter rounded-tl-sm">
          <Price currency="$" num={product.price} numSize="text-lg" />
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
