import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { logoutUser } from "../../store/reducers/user/user.actions";

import { auth } from "../../config/firebase.config";

import { CartContext } from "../../contexts/cart.context";

import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle,
} from "./header.styles";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/redux.hooks";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
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
    dispatch(logoutUser());
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
