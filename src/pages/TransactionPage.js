import { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/user.context";

export default function TransactionsPage() {
  const { user } = useContext(UserContext);
  const { tipo } = useParams();
  const { state } = useLocation();

  const type = tipo === "saida" ? "saída" : "entrada";
  const editing = state !== null;

  function handleSubmit(event) {
    event.preventDefault();
    const value = event.target["value"].value;
    const title = event.target["title"].value;

    // Editar ou salvar
    console.log({
      userId: user.id,
      title: title,
      value: Number(value),
      isExit: tipo === "saida",
    });
  }

  return (
    <TransactionsContainer>
      <h1>
        {editing ? "Editar" : "Nova"} {type}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          defaultValue={state?.value}
          required
          name="value"
          placeholder="Valor"
          type="text"
        />
        <input
          defaultValue={state?.title}
          required
          name="title"
          placeholder="Descrição"
          type="text"
        />
        <button type="submit">Salvar {type}</button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
