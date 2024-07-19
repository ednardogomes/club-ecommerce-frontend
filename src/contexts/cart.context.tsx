import React, {
  Children,
  createContext,
  FunctionComponent,
  useState,
} from "react";
import CartProduct from "../types/types.cart";

interface ICartContext {
  isVisible: boolean;
  products: CartProduct[];
  toggleCart: () => void;
}
const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => {},
});

interface CartContextProviderProps {
  children: React.ReactNode;
}

const CartContextProvider: FunctionComponent<CartContextProviderProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const toggleCart = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <CartContext.Provider value={{ isVisible, products, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
