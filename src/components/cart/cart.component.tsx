import { FunctionComponent, useContext } from "react";
import { BsCartCheck } from "react-icons/bs";

import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal,
} from "./cart.styles";

import CustomButton from "../custom-button/custom-button.component";

import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux.hooks";
import { useDispatch } from "react-redux";
import { toggleCart } from "../../store/reducers/cart/cart.actions";

const Cart: FunctionComponent = () => {
  const { isVisible, products } = useAppSelector((state) => state.cartReducer);
  const { productsTotalPrice, productsCount } = useContext(CartContext);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleGoToCheckoutClick = () => {
    navigate("/checkout");
    dispatch(toggleCart());
  };

  const handleScapeAreaClick = () => {
    dispatch(toggleCart());
  };

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={handleScapeAreaClick} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        {productsCount > 0 && (
          <CartTotal>Total: R${productsTotalPrice}</CartTotal>
        )}

        {productsCount > 0 && (
          <CustomButton
            startIcon={<BsCartCheck />}
            onClick={handleGoToCheckoutClick}
          >
            Ir para o Checkout
          </CustomButton>
        )}

        {productsCount === 0 && <p>Seu carrinho está vazio!</p>}
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
