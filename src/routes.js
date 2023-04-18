import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionsPage from "./pages/TransactionPage";
import { useContext } from "react";
import UserContext from "./contexts/user.context";

export default function MyRoutes() {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route
        path="/"
        element={!user ? <SignInPage /> : <Navigate to="/home" />}
      />
      <Route
        path="/cadastro"
        element={!user ? <SignUpPage /> : <Navigate to="/home" />}
      />
      <Route path="/home" element={user ? <HomePage /> : <Navigate to="/" />} />
      <Route
        path="/nova-transacao/:tipo"
        element={user ? <TransactionsPage /> : <Navigate to="/" />}
      />
      <Route
        path="/editar-registro/:tipo"
        element={user ? <TransactionsPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
