import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from "react";

import CartProduct from "../types/types.cart";
import Product from "../types/product.types";

interface ICartContext {
  isVisible: boolean;
  productsTotalPrice: number;
  productsCount: number;
  products: CartProduct[];
  toggleCart: () => void;
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  clearProducts: () => void;
}
export const CartContext = createContext<ICartContext>({
  isVisible: false,
  productsTotalPrice: 0,
  productsCount: 0,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
  clearProducts: () => {},
});

interface CartContextProviderProps {
  children: React.ReactNode;
}

const CartContextProvider: FunctionComponent<CartContextProviderProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>(() => {
    try {
      const productsFromLocalStorage = localStorage.getItem("cartProducts");
      return productsFromLocalStorage
        ? JSON.parse(productsFromLocalStorage)
        : [];
    } catch (error) {
      console.error("Failed to parse products from local storage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(products));
  }, [products]);

  const productsTotalPrice = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.price * currentProduct.quantity;
    }, 0);
  }, [products]);

  const productsCount = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.quantity;
    }, 0);
  }, [products]);

  const toggleCart = () => {
    setIsVisible((prevState) => !prevState);
  };

  const addProductToCart = (product: Product) => {
    const productIsAlreadyInCart = products.some(
      (item) => item.id === product.id
    );

    if (productIsAlreadyInCart) {
      return setProducts((products) =>
        products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }

    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }]);
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((products) => products);
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((products) => products);
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((products) => products);
  };

  const clearProducts = () => {
    setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        isVisible,
        products,
        productsTotalPrice,
        productsCount,
        toggleCart,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        clearProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
