import { FunctionComponent } from "react";
import { AiOutlinePlus, AiOutlineClose, AiOutlineMinus } from "react-icons/ai";

import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton,
} from "./cart-item.styles";
import CartProduct from "../../types/types.cart";

interface CartItemProps {
  product: CartProduct;
}

const CartItem: FunctionComponent<CartItemProps> = ({ product }) => {
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
      <RemoveButton>
        <AiOutlineClose size={25} />
      </RemoveButton>
    </CartItemContainer>
  );
};

export default CartItem;
