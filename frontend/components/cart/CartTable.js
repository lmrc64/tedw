import { useCartContext, useUpdateCartQuantityContext } from "@/context/Store";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Price from "@/components/Price";


async function getCoupon(coupunId) {
  
  const response = await fetch(
    process.env.API_ROUTE +'/coupons/code/'+coupunId);
  if (!response.ok) {
    if (response.status === 404){
      throw new Error("404: No products found");  
    }
    throw new Error("Error fetching data");
  }
  
  const data = await response.json();
  // console.log(data['coupon'].discount)
  return {
    discount: data['coupon'].discount,
    codigo: data['coupon'].codigo
  };
}

var lastSubtotal;
var total2;

function CartTable() {
  const cart = useCartContext();
  const updateCart = useUpdateCartQuantityContext();
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState("");

  // setSubtotal(
  //   cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  // );

  useEffect(() => {
    // console.log(coupon.discount)
    
    if (cart && cart.length > 0) {
      if(coupon != ""){
        // console.log(coupon.discount + " ansdkjnb")
        sessionStorage.setItem("discount", coupon.discount)
        sessionStorage.setItem("codigoC", coupon.codigo)
        setSubtotal(
          cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        );
        lastSubtotal = subtotal
        setTotal(
          lastSubtotal - (lastSubtotal * (coupon.discount / 100))
        );
        total2 = total
      }
      else{
        sessionStorage.setItem("discount", "")
        sessionStorage.setItem("codigoC", "")
        setSubtotal(
          cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        );
        setTotal(
          cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        );
        total2 = total
        // sessionStorage.setItem("totalProducts", total2)
        // console.log(subtotal + "askdinhino")
      }
      
    } else {
      setSubtotal(0);
    }
    // total = subtotal
  }, [cart, coupon]);

  function handleUpdateItem(productId, quantity) {
    updateCart(productId, quantity);
  }

  async function handleUpdatePriceSubtotal(code){
    try {
      setCoupon(await getCoupon(code))
      
    } catch (error) {
      setCoupon("")
    }
    
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

          { (subtotal > 0 && coupon != "" )&& (
             <>
             <tr>
               <td></td>
               <td className="text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
                 Subtotal
               </td>
               <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                 <Price currency="$" num={subtotal} />
               </td>
               <td >
                
               </td>
             </tr>
             </>
            )}

          { (subtotal > 0 && coupon == "") && (
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
             </>
            )}

            {subtotal > 0 && (
              <>
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
                   onKeyDown={(e) => {
                    if (e.key === "Enter") handleUpdatePriceSubtotal(e.target.value);
                  }}
                   className="bg-gray-50 border border-purple-300 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-800 block w-full p-2.5"
                   placeholder="Enter your coupon code"
                 />
               </td>
             </tr>
              </>
            )}

            
         
            {subtotal > 0 && (
              <>
              {/* Total */}
              <tr className="mt-4">
               <td></td>
               <td className="text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
                 Total
               </td>
               <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                 <Price currency="$" num={total} />
                 {/* ${total} */}
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
