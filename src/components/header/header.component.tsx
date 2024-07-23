import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useContext } from "react";

import { auth } from "../../config/firebase.config";

import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle,
} from "./header.styles";

import { CartContext } from "../../contexts/cart.context";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  );

  const { toggleCart, productsCount } = useContext(CartContext);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpclick = () => {
    navigate("sign-up");
  };

  const handleExploreClick = () => {
    navigate("/explore");
  };

  const handleSignOutClick = () => {
    dispatch({ type: "LOGOUT_USER" });
    signOut(auth);
  };

  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleLogoClick}>Club Clothing</HeaderTitle>

      <HeaderItems>
        <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpclick}>Criar conta</HeaderItem>
          </>
        )}
        {isAuthenticated && (
          <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
        )}
        <HeaderItem onClick={toggleCart}>
          <BsCart3 size={18} />
          <p style={{ marginLeft: 5 }}>{productsCount}</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
