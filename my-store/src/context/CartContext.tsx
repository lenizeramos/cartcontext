import { createContext, useContext, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
}
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const addToCart = (item: CartItem) => {
    console.log("Added to cart")
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCartContext must be used within a CartContextProvider"
    );
  }
  return context;
};

export {CartProvider, CartContext,useCart};
