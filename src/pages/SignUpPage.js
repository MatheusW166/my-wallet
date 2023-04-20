import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import myWalletApi from "../services/mywalletapi.service.js";
import { useMutation } from "react-query";
import Loading from "../components/Loading.js";

export default function SignUpPage() {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    async ({ name, email, password }) => {
      try {
        const user = {
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        };
        await myWalletApi.signUp(user);
        navigate("/");
      } catch (err) {
        alert(err.message);
      }
    }
  );

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target["name"].value;
    const email = event.target["email"].value;
    const password = event.target["password"].value;
    const confirm = event.target["password-confirm"].value;

    if (confirm !== password) {
      alert("As senhas não são iguais!");
      return;
    }

    mutate({ name, email, password });
  }

  return (
    <SingUpContainer>
      <Loading active={isLoading} />
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input
          disabled={isLoading}
          required
          name="name"
          placeholder="Nome"
          type="text"
        />
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
        <input
          disabled={isLoading}
          required
          name="password-confirm"
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
        />
        <button disabled={isLoading} type="submit">
          Cadastrar
        </button>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
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
