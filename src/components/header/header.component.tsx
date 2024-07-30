import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { logoutUser } from "../../store/reducers/user/user.actions";
import { toggleCart } from "../../store/reducers/cart/cart.actions";
import { auth } from "../../config/firebase.config";
import { useSelector } from "react-redux";
import { selectProductsCount } from "../../store/reducers/cart/cart.selectors";

import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle,
} from "./header.styles";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/redux.hooks";
import { AppDispatch } from "../../store/store";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  );

  const productsCount = useSelector(selectProductsCount);

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

  const handleCartClick = () => {
    dispatch(toggleCart());
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
        <HeaderItem onClick={handleCartClick}>
          <BsCart3 size={18} />
          <p style={{ marginLeft: 5 }}>{productsCount}</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
