"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartContext } from "@/context/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Categories from "@/components/navbar/SelectCategory";
import Search from "@/components/navbar/InputSearch";


function Nav({ onCategoryChange , onSearch}) {
  const cart = useCartContext() || [];
  const [cartItems, setCartItems] = useState(0);

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
  };

  useEffect(() => {
    const numItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartItems(numItems);
  }, [cart]);

  return (
    <div>
      <div className="border-b border-palette-lighter sticky top-0 z-20 bg-white w-full">
        <div className="flex items-center justify-between mx-auto max-w-6xl px-6 pb-2 pt-4 md:pt-6">
          <Link href="/">
            <div className="cursor-pointer">
              <h1 className="flex no-underline">
                <img
                  height="32"
                  width="32"
                  alt="logo"
                  className="h-8 w-8 mr-1 object-contain"
                  src="/icon.svg"
                />
                <span className="text-xl font-primary font-bold tracking-tight pt-1">
                  {process.env.siteTitle}
                </span>
              </h1>
            </div>
          </Link>
          <Categories onCategoryChange={handleCategoryChange} />
          <Search onSearch={onSearch}/>
          <div>
            <Link href="/store/cart">
              <div className="relative" aria-label="cart">
                <FontAwesomeIcon
                  className="text-palette-primary w-6 m-auto"
                  icon={faShoppingCart}
                />
                {cartItems === 0 ? (
                  <div className="absolute top-0 right-0 text-xs bg-yellow-400 text-gray-900 font-semibold rounded-full py-1 px-2 transform  -translate-y-6">
                    {cartItems}
                  </div>
                ) : (
                  <div className="absolute top-0 right-0 text-xs bg-yellow-400 text-gray-900 font-semibold rounded-full py-1 px-2 transform -translate-y-6">
                    {cartItems}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Nav;
