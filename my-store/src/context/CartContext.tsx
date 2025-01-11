import { createContext, useContext, useReducer } from "react";
import { StoreItem } from "../components/StoreItems";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: StoreItem) => void;
  removeFromCart: (id: number) => void;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: StoreItem }
  | { type: "REMOVE_FROM_CART"; payload: number };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingCartItem = state.find(
        (item) => item.id === action.payload.id
      );

      if (existingCartItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "REMOVE_FROM_CART": {
      return state.reduce<CartItem[]>((newState, item) => {
        if (item.id === action.payload) {
          if (item.quantity > 1) {
            newState.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          newState.push(item);
        }
        return newState;
      }, []);
    }

    default:
      throw new Error(`Unhandled action type`);
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const addToCart = (item: StoreItem) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};

export { CartProvider, CartContext, useCart };
