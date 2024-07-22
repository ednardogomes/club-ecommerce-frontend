import { FunctionComponent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";

import Header from "../header/header.component";
import Loading from "../loading/loading.component";

interface AuthenticationProps {
  children: React.ReactNode;
}

const AuthenticationGuard: FunctionComponent<AuthenticationProps> = ({
  children,
}) => {
  const { isAuthenticated } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Loading message="Você prtecisa esta logado para acessar esta página. Você sera redirecionado para a página de login em instantes..." />
      </>
    );
  }

  return <>{children}</>;
};

export default AuthenticationGuard;
