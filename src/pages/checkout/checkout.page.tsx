import { FunctionComponent } from "react";

import Header from "../../components/header/header.component";
import Checkout from "../../components/checkout/checkout.component";

const CheckoutPage: FunctionComponent = () => {
  return (
    <>
      <Header />
      <Checkout />
    </>
  );
};

export default CheckoutPage;
