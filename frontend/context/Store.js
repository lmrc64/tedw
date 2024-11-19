"use client";

import { createContext, useContext, useState, useEffect  } from "react";

// Crear contextos para el carrito y sus acciones
const CartContext = createContext();
const AddToCartContext = createContext();
const UpdateCartQuantityContext = createContext();
const IsLoadingContext = createContext();

// Hooks personalizados para usar los contextos
export function useCartContext() {
  return useContext(CartContext);
}

export function useAddToCartContext() {
  return useContext(AddToCartContext);
}

export function useUpdateCartQuantityContext() {
  return useContext(UpdateCartQuantityContext);
}

export function useIsLoadingContext() {
  return useContext(IsLoadingContext);
}


// Proveedor de contexto del carrito
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 

  // Función para añadir un producto al carrito
  function addToCart(newItem) {
    setIsLoading(true);
    const existingItem = cart.find((item) => item._id === newItem._id);
  
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item._id === newItem._id
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...newItem, quantity: newItem.quantity || 1 }]);
    }
  
    setIsLoading(false);
  }
  
  // Función para actualizar la cantidad de un producto en el carrito
  function updateCartItemQuantity(productId, quantity) {
    setIsLoading(true); 
    const updatedCart = cart
      .map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
      .filter((item) => item.quantity > 0); 
  
    setCart(updatedCart);
    setIsLoading(false);
  }
  

  // Proveer contextos anidados para los hijos
  return (
    <CartContext.Provider value={cart}>
      <AddToCartContext.Provider value={addToCart}>
        <UpdateCartQuantityContext.Provider value={updateCartItemQuantity}>
          <IsLoadingContext.Provider value={isLoading}>
            {children}
          </IsLoadingContext.Provider>
        </UpdateCartQuantityContext.Provider>
      </AddToCartContext.Provider>
    </CartContext.Provider>
  );
}
