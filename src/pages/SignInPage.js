import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useContext } from "react";
import UserContext from "../contexts/user.context";
import userAuth from "../auth/user.auth.js";
import { useMutation } from "react-query";
import Loading from "../components/Loading.js";

export default function SignInPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation(async ({ email, password }) => {
    try {
      const user = await userAuth.logIn({
        email: email.trim(),
        password: password.trim(),
      });
      setUser(user);
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  });

  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target["email"].value;
    const password = event.target["password"].value;
    mutate({ email, password });
  }

  return (
    <SingInContainer>
      <Loading active={isLoading} />
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input
          disabled={isLoading}
          required
          name="email"
          placeholder="E-mail"
          type="email"
        />
        <input
          disabled={isLoading}
          required
          name="password"
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
        />
        <button disabled={isLoading} type="submit">
          Entrar
        </button>
      </form>
      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    color: white;
    line-height: normal;
    margin-top: 30px;
    font-weight: 700;
  }
`;
