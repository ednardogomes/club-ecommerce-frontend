import { FunctionComponent } from "react";
import { BsCartCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal,
} from "./cart.styles";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import { useAppSelector } from "../hooks/redux.hooks";
import { toggleCart } from "../../store/reducers/cart/cart.actions";
import {
  selectProductsCount,
  selectProductsTotalPrice,
} from "../../store/reducers/cart/cart.selectors";

const Cart: FunctionComponent = () => {
  const { isVisible, products } = useAppSelector((state) => state.cartReducer);

  const productsTotalPrice = useAppSelector(selectProductsTotalPrice);
  const productsCount = useAppSelector(selectProductsCount);

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
