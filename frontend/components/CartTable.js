import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Price from '@/components/Price';

function CartTable() {
  // Datos simulados para el carrito
  const cartItems = [
    {
      variantId: 1,
      productTitle: "Producto A",
      variantTitle: "Variante A",
      productHandle: "producto-a",
      productImage: {
        originalSrc: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg",
        altText: "Imagen Producto A"
      },
      variantQuantity: 2,
      variantPrice: 30
    },
    {
      variantId: 2,
      productTitle: "Producto B",
      variantTitle: "Variante B",
      productHandle: "producto-b",
      productImage: {
        originalSrc: "https://cdn.pixabay.com/photo/2016/03/09/09/17/wood-type-1246266_640.jpg",
        altText: "Imagen Producto B"
      },
      variantQuantity: 1,
      variantPrice: 50
    }
  ];

  // Cálculo estático del subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.variantPrice * item.variantQuantity, 0);

  return (
    <div className="min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full">
      <table className="mx-auto">
        <thead>
          <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
            <th className="font-primary font-normal px-6 py-4">Product</th>
            <th className="font-primary font-normal px-6 py-4">Quantity</th>
            <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">Price</th>
            <th className="font-primary font-normal px-6 py-4">Remove</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-palette-lighter">
          {cartItems.map(item => (
            <tr key={item.variantId} className="text-sm sm:text-base text-gray-600 text-center">
              <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                <img
                  src={item.productImage.originalSrc}
                  alt={item.productImage.altText}
                  height={64}
                  width={64}
                  className="hidden sm:inline-flex"
                />
                <Link href={`/products/${item.productHandle}`} className="pt-1 hover:text-palette-dark">
                  {item.productTitle}, {item.variantTitle}
                </Link>
              </td>
              <td className="font-primary font-medium px-4 sm:px-6 py-4">
                {item.variantQuantity}
              </td>
              <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                <Price currency="$" num={item.variantPrice} numSize="text-lg" />
              </td>
              <td className="font-primary font-medium px-4 sm:px-6 py-4">
                <button
                  aria-label="delete-item"
                  className=""
                >
                  <FontAwesomeIcon icon={faTimes} className="w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter" />
                </button>
              </td>
            </tr>
          ))}
          <tr className="text-center">
            <td></td>
            <td className="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">Subtotal</td>
            <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
              <Price currency="$" num={subtotal} numSize="text-xl" />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CartTable;
