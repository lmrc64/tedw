import { useCartContext, useUpdateCartQuantityContext } from "@/context/Store";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Price from "@/components/Price";

function CartTable() {
  const cart = useCartContext();
  const updateCart = useUpdateCartQuantityContext();
  const [subtotal, setSubtotal] = useState(0);
  const [coupon, setCoupon] = useState("");


  useEffect(() => {
    if (cart && cart.length > 0) {
      setSubtotal(
        cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
      );
    } else {
      setSubtotal(0);
    }
  }, [cart]);

  function handleUpdateItem(productId, quantity) {
    updateCart(productId, quantity);
  }

  return (
    <div className="min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full">
      <table className="mx-auto">
        <thead>
          <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
            <th className="font-primary font-normal px-6 py-4">Product</th>
            <th className="font-primary font-normal px-6 py-4">Quantity</th>
            <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">
              Price
            </th>
            <th className="font-primary font-normal px-6 py-4">Remove</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-palette-lighter">
          {cart.length > 0 ? (
            cart.map((item) => (
              <tr
                key={item._id}
                className="text-sm sm:text-base text-gray-600 text-center"
              >
                <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                  <img
                    src={item.productImage}
                    alt={item.productTitle}
                    height={64}
                    width={64}
                    className="hidden sm:inline-flex"
                  />
                  <Link href={`/store/products/${item._id}`}>
                    <div className="pt-1 hover:text-palette-dark">
                      {item.productTitle}
                    </div>
                  </Link>
                </td>
                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateItem(item._id, parseInt(e.target.value))
                    }
                    className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
                  />
                </td>
                <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                  <Price currency="$" num={item.price} />
                </td>
                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                  <button
                    aria-label="delete-item"
                    onClick={() => handleUpdateItem(item._id, 0)}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter"
                    />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-gray-600 py-4">
                Your cart is empty.
              </td>
            </tr>
          )}
          {subtotal > 0 && (
             <>
             {/* Subtotal */}
             <tr>
               <td></td>
               <td className="text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
                 Subtotal
               </td>
               <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                 <Price currency="$" num={subtotal} />
               </td>
               <td></td>
             </tr>
         
             {/* Coupon Code */}
             <tr className="mt-4">
               <td></td>
               <td className="text-base text-purple-600 font-semibold uppercase sm:px-6 py-4">
                 Coupon Code
               </td>
               <td className="text-center">
                 <input
                   type="text"
                   id="coupon"
                   onChange={(e) => setCoupon(e.target.value)}
                   className="bg-gray-50 border border-purple-300 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-800 block w-full p-2.5"
                   placeholder="Enter your coupon code"
                 />
               </td>
             </tr>
  
             {/* Total */}
             <tr className="mt-4">
               <td></td>
               <td className="text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
                 Total
               </td>
               <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                 <Price currency="$" num={subtotal} />
               </td>
               <td></td>
             </tr>
           </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CartTable;
