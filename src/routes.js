import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionsPage from "./pages/TransactionPage";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/cadastro" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
      <Route path="/editar-registro/:tipo" element={<TransactionsPage />} />
    </Routes>
  );
}
