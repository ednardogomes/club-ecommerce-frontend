import { FunctionComponent, useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import SignUpPage from "./pages/sign-up/sign-up.page";
import ExplorePage from "./pages/explore/explore.page";

import { auth, db } from "./config/firebase.config";
import { UserContext } from "./contexts/user.context";

import { userConverter } from "./components/converters/firestore.converters";
import Loading from "./components/loading/loading.component";
import CategoryDetailsPage from "./pages/category-details/category-details.page";
import Cart from "./components/cart/cart.component";
interface AppProps {
  message?: string;
}
const App: FunctionComponent<AppProps> = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext);

  onAuthStateChanged(auth, async (user) => {
    const isSigningOut = isAuthenticated && !user;

    if (isSigningOut) {
      logoutUser();
      return setIsInitializing(false);
    }

    const isSigningIn = !isAuthenticated && user;
    if (isSigningIn) {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users").withConverter(userConverter),
          where("id", "==", user.uid)
        )
      );

      const userFromFirestore = querySnapshot.docs[0]?.data();

      loginUser(userFromFirestore);

      return setIsInitializing(false);
    }

    return setIsInitializing(false);
  });

  if (isInitializing) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/category/:id" element={<CategoryDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login/sign-up" element={<SignUpPage />} />
      </Routes>
      <Cart />
    </BrowserRouter>
  );
};

export default App;
