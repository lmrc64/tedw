import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useAddToCartContext, useIsLoadingContext } from "@/context/Store";

function ProductForm({ id, title, price, mainImg }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCartContext();
  const isLoading = useIsLoadingContext();

  const atcBtnStyle = isLoading
    ? `pt-3 pb-2 bg-palette-primary text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex 
                      justify-center items-baseline  hover:bg-palette-dark opacity-25 cursor-none`
    : `pt-3 pb-2 bg-palette-primary text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex 
                      justify-center items-baseline  hover:bg-palette-dark`;

  async function handleAddToCart() {
    if (quantity > 0) {
      addToCart({
        _id: id,
        productTitle: title,
        productImage: mainImg,
        quantity: quantity,
        price: price,
      });
    }
  }

  function updateQuantity(value) {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue <= 0) {
      setQuantity(1);
    } else {
      setQuantity(parsedValue);
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-start space-x-2 w-full">
        <div className="flex flex-col items-start space-y-1 flex-grow-0">
          <label htmlFor="quantity" className="text-gray-500 text-base">
            Qty.
          </label>
          <input
            type="number"
            inputMode="numeric"
            id="quantity"
            name="quantity"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => updateQuantity(e.target.value)}
            className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
          />
        </div>
      </div>

      <button
        className={atcBtnStyle}
        aria-label="cart-button"
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        Add To Cart
        <FontAwesomeIcon icon={faShoppingCart} className="w-5 ml-2" />
      </button>
    </div>
  );
}

export default ProductForm;
