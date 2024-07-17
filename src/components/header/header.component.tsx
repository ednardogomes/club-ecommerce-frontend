import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useContext } from "react";

import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle,
} from "./header.styles";

import { auth } from "../../config/firebase.config";
import { UserContext } from "../../contexts/user.context";

const Header = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(UserContext);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpclick = () => {
    navigate("sign-up");
  };

  return (
    <HeaderContainer>
      <HeaderTitle>Club Clothing</HeaderTitle>

      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpclick}>Criar conta</HeaderItem>
          </>
        )}
        {isAuthenticated && (
          <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
        )}
        <HeaderItem>
          <BsCart3 size={18} />
          <p style={{ marginLeft: 5 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
