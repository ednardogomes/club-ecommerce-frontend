const CartActionTypes = {
  toggleCart: "cart/toggle" as const,
  addProductToCart: "cart/addProduct" as const,
  removeProductsFromCart: "cart/removeProduct" as const,
  increaseCartProductQuantity: "cart/ increaseCartProductQuantity" as const,
  decreaseCartProductQuantity: "cart/ decreaseCartProductQuantity" as const,
  clearCartProducts: "cart/clearProducts" as const,
};

export default CartActionTypes;
