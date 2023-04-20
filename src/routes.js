import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionsPage from "./pages/TransactionPage";
import { useContext } from "react";
import UserContext from "./contexts/user.context";

export default function MyRoutes() {
  const { user } = useContext(UserContext);
  const isAuthenticated = user !== null;

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/home" /> : <SignInPage />}
      />
      <Route
        path="/cadastro"
        element={isAuthenticated ? <Navigate to="/home" /> : <SignUpPage />}
      />
      <Route
        path="/home"
        element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
      />
      <Route
        path="/nova-transacao/:tipo"
        element={isAuthenticated ? <TransactionsPage /> : <Navigate to="/" />}
      />
      <Route
        path="/editar-registro/:tipo"
        element={isAuthenticated ? <TransactionsPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
