import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/user.context";
import { Link } from "react-router-dom";
import { myWalletApiAdapter } from "../services";
import dayjs from "dayjs";

function formatMoney(value) {
  if (!value) return "";
  return value.toFixed(2).replace(".", ",");
}

export default function HomePage() {
  const { user, setUser } = useContext(UserContext);
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    myWalletApiAdapter
      .getUserTransactions({
        token: user.token,
      })
      .then((res) => setTransactions(res))
      .catch((err) => alert(err.message));
  }, [user]);

  const total = transactions?.reduce(
    (prev, curr) => prev + (curr.isExit ? -curr.value : curr.value),
    0
  );

  function logOut() {
    setUser(null);
    localStorage.removeItem("my-wallet");
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user?.name}</h1>
        <Link to="/" onClick={logOut}>
          <BiExit />
        </Link>
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions?.map((t, idx) => (
            <ListItemContainer key={idx}>
              <Link
                state={t}
                to={`/editar-registro/${t.isExit ? "saida" : "entrada"}`}>
                <div>
                  <span>{dayjs(t.createdAt).format("DD/MM")}</span>
                  <strong>{t.description}</strong>
                </div>
                <Value color={t.isExit ? "negativo" : "positivo"}>
                  {formatMoney(t.value)}
                </Value>
              </Link>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={total < 0 ? "negativo" : "positivo"}>
            {formatMoney(total)}
          </Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <Link to="/nova-transacao/entrada">
          <button>
            <AiOutlinePlusCircle />
            <p>
              Nova <br /> entrada
            </p>
          </button>
        </Link>
        <Link to="/nova-transacao/saida">
          <button>
            <AiOutlineMinusCircle />
            <p>
              Nova <br />
              saída
            </p>
          </button>
        </Link>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  a {
    width: 50%;
  }

  button {
    width: 100%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;

  a {
    width: 100%;
    line-height: normal;
    display: flex;
    justify-content: space-between;
  }

  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;
