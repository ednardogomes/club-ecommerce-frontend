import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle,
} from "./header.styles";

const Header = () => {
  const navigate = useNavigate();

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
        <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
        <HeaderItem onClick={handleSignUpclick}>Criar conta</HeaderItem>
        <HeaderItem>
          <BsCart3 size={18} />
          <p style={{ marginLeft: 5 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
