import { FunctionComponent } from "react";
import { AiOutlinePlus, AiOutlineClose, AiOutlineMinus } from "react-icons/ai";
import { useDispatch } from "react-redux";

import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton,
} from "./cart-item.styles";

import CartProduct from "../../types/types.cart";

import {
  removeProductFromCart,
  increaseCartProductQuantity,
  decreaseCartProductQuantity,
} from "../../store/reducers/cart/cart.actions";
import { AppDispatch } from "../../store/store";

interface CartItemProps {
  product: CartProduct;
}

const CartItem: FunctionComponent<CartItemProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCart(product.id));
  };

  const handleIncreaseClick = () => {
    dispatch(increaseCartProductQuantity(product.id));
  };

  const handleDecreaseClick = () => {
    dispatch(decreaseCartProductQuantity(product.id));
  };

  return (
    <CartItemContainer>
      <CartItemImage imageUrl={product.imageUrl} />
      <CartItemInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>

        <CartItemQuantity>
          <AiOutlineMinus size={20} onClick={handleDecreaseClick} />
          <p>{product.quantity}</p>
          <AiOutlinePlus size={20} onClick={handleIncreaseClick} />
        </CartItemQuantity>
      </CartItemInfo>
      <RemoveButton onClick={handleRemoveFromCart}>
        <AiOutlineClose size={25} />
      </RemoveButton>
    </CartItemContainer>
  );
};

export default CartItem;
