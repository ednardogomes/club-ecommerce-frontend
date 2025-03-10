import { FunctionComponent, useState } from "react";
import axios from "axios";
import { BsBagCheck } from "react-icons/bs";

import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal,
} from "./checkout.styles";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import Loading from "../loading/loading.component";

import { useAppSelector } from "../hooks/redux.hooks";
import { selectProductsTotalPrice } from "../../store/reducers/cart/cart.selectors";
import CartProduct from "../../types/types.cart";

const Checkout: FunctionComponent = () => {
  const { products } = useAppSelector((state) => state.cartReducer);
  const productsTotalPrice = useAppSelector(selectProductsTotalPrice);

  const [isLoading, setIsLoading] = useState(false);

  const handleFinishPurchaseClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/create-checkout-session`,
        {
          products,
        }
      );
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <CheckoutContainer>
        <CheckoutTitle>Checkout</CheckoutTitle>

        {products.length > 0 ? (
          <>
            <CheckoutProducts>
              {products.map((product: CartProduct) => (
                <CartItem key={product.id} product={product} />
              ))}
            </CheckoutProducts>

            <CheckoutTotal>Total: R${productsTotalPrice}</CheckoutTotal>

            <CustomButton
              startIcon={<BsBagCheck />}
              onClick={handleFinishPurchaseClick}
            >
              Finalizar Compra
            </CustomButton>
          </>
        ) : (
          <p>Seu carrinho está vazio!</p>
        )}
      </CheckoutContainer>
    </>
  );
};

export default Checkout;
