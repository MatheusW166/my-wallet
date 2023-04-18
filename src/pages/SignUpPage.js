import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { myWalletApiAdapter } from "../services";

export default function SignUpPage() {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const name = event.target["name"].value;
    const email = event.target["email"].value;
    const password = event.target["password"].value;
    const confirm = event.target["password-confirm"].value;

    if (confirm !== password) {
      alert("As senhas não são iguais!");
      return;
    }

    try {
      const user = { name, email, password };
      await myWalletApiAdapter.signUp(user);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input required name="name" placeholder="Nome" type="text" />
        <input required name="email" placeholder="E-mail" type="email" />
        <input
          required
          name="password"
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
        />
        <input
          required
          name="password-confirm"
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
        />
        <button type="submit">Cadastrar</button>
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
