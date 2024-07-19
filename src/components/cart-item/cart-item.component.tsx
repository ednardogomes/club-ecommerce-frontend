import { FunctionComponent, useContext } from "react";
import { AiOutlinePlus, AiOutlineClose, AiOutlineMinus } from "react-icons/ai";

import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton,
} from "./cart-item.styles";
import CartProduct from "../../types/types.cart";
import { CartContext } from "../../contexts/cart.context";

interface CartItemProps {
  product: CartProduct;
}

const CartItem: FunctionComponent<CartItemProps> = ({ product }) => {
  const { removeProductFromCart } = useContext(CartContext);

  const handleRemoveFromCart = () => {
    removeProductFromCart(product.id);
  };
  return (
    <CartItemContainer>
      <CartItemImage imageUrl={product.imageUrl} />
      <CartItemInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>

        <CartItemQuantity>
          <AiOutlineMinus size={20} />
          <p>{product.quantity}</p>
          <AiOutlinePlus size={20} />
        </CartItemQuantity>
      </CartItemInfo>
      <RemoveButton onClick={handleRemoveFromCart}>
        <AiOutlineClose size={25} />
      </RemoveButton>
    </CartItemContainer>
  );
};

export default CartItem;
