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

const Cart: FunctionComponent = () => {
  const { isVisible, products, toggleCart, productsTotalPrice, productsCount } =
    useContext(CartContext);

  const navigate = useNavigate();

  const handleGoToCheckoutClick = () => {
    navigate("/checkout");
    toggleCart();
  };

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart} />
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
