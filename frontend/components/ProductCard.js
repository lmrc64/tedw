import Image from 'next/image';
import Link from 'next/link';
import Price from '@/components/Price';

function ProductCard() {
  return (
    <Link
      href={`/products/1`}
      className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter"
    >
      <div className="h-72 border-b-2 border-palette-lighter relative">
        <Image
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg"
          alt="Imagen"
          layout="fill"
          className="transform duration-500 ease-in-out hover:scale-110"
        />
      </div>
      <div className="h-48 relative">
        <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold">
          Producto1
        </div>
        <div className="text-lg text-gray-600 p-4 font-primary font-light">
          Descripcion1
        </div>
        <div
          className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
          rounded-tl-sm triangle"
        >
          <Price currency="$" num="30" numSize="text-lg" />
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
