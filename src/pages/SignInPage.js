import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { myWalletApiAdapter } from "../services";
import { useContext } from "react";
import UserContext from "../contexts/user.context";

export default function SignInPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const email = event.target["email"].value;
    const password = event.target["password"].value;

    try {
      const user = await myWalletApiAdapter.logIn({
        email,
        password,
      });
      setUser(user);
      navigate("/home");
      localStorage.setItem("my-wallet", JSON.stringify(user));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <SingInContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input required name="email" placeholder="E-mail" type="email" />
        <input
          required
          name="password"
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
        />
        <button type="submit">Entrar</button>
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
