import { FunctionComponent, useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import SignUpPage from "./components/sign-up/sign-up.page";

import { auth, db } from "./config/firebase.config";
import { UserContext } from "./contexts/user.context";
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
        query(collection(db, "users"), where("id", "==", user.uid))
      );

      const userFromFirestore = querySnapshot.docs[0]?.data();

      loginUser(userFromFirestore as any);

      return setIsInitializing(false);
    }

    return setIsInitializing(false);
  });

  if (isInitializing) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
