import { FunctionComponent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineHome,
} from "react-icons/ai";
import { useDispatch } from "react-redux";

import Header from "../../components/header/header.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import {
  PaymentConfirmationContainer,
  PaymentConfirmationContent,
} from "./payment-confirmation.styles";

import Colors from "../../theme/theme.colors";

import { clearCartProducts } from "../../store/reducers/cart/cart.actions";
import { AppDispatch } from "../../store/store";

const PaymenteConfirmationPage: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const status = searchParams.get("success");
  const isCanceled = searchParams.get("canceled") === "true";

  useEffect(() => {
    if (status === "true") {
      dispatch(clearCartProducts());
    }
  }, [status]);

  const handleGoToHomePageClick = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <PaymentConfirmationContainer>
        <PaymentConfirmationContent>
          {status === "true" && (
            <>
              <AiOutlineCheckCircle size={120} color={Colors.success} />
              <p>Sua Compra foi finalizada com sucesso!</p>
            </>
          )}

          {(status === "false" || isCanceled) && (
            <>
              <AiOutlineCloseCircle size={120} color={Colors.error} />
              <p>
                Ocorreu um erro ao finalizar sua compra. Por favor, tenta
                novamente.
              </p>
            </>
          )}

          <CustomButton
            startIcon={<AiOutlineHome />}
            onClick={handleGoToHomePageClick}
          >
            Ir para a Página Inicial
          </CustomButton>
        </PaymentConfirmationContent>
      </PaymentConfirmationContainer>
    </>
  );
};
export default PaymenteConfirmationPage;
