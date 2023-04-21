/* eslint-disable no-restricted-globals */
import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext } from "react";
import UserContext from "../contexts/user.context";
import { Link } from "react-router-dom";
import { formatMoney } from "../utils/money.utils.js";
import dayjs from "dayjs";
import userAuth from "../auth/user.auth.js";
import myWalletApi from "../services/mywalletapi.service.js";
import { useQuery } from "react-query";
import Loading from "../components/Loading.js";

export default function HomePage() {
  const { user, setUser } = useContext(UserContext);

  const { isLoading, data, refetch } = useQuery(
    "transactions",
    async () => {
      try {
        console.log("chama!");
        return await myWalletApi.getUserTransactions({
          token: user.token,
        });
      } catch (err) {
        alert(err.message);
      }
    },
    { refetchOnWindowFocus: false }
  );

  function logOut() {
    setUser(null);
    userAuth.endSession();
  }

  const total = data?.reduce(
    (prev, curr) => prev + (curr.isExit ? -curr.value : curr.value),
    0
  );

  async function handleDelete({ _id }) {
    if (!confirm("Quer deletar essa transação?")) {
      return;
    }
    try {
      await myWalletApi.deleteTransaction({ id: _id, token: user.token });
      refetch();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <HomeContainer>
      <Loading active={isLoading} />

      <Header>
        <h1>Olá, {user?.name}</h1>
        <Link to="/" onClick={logOut}>
          <BiExit />
        </Link>
      </Header>

      <TransactionsContainer>
        {data?.length === 0 ? (
          <p>Não há registros de entrada ou saída</p>
        ) : (
          <ul>
            {data?.map((transaction) => (
              <ListItemContainer key={transaction._id}>
                <Link
                  state={transaction}
                  to={`/editar-registro/${
                    transaction.isExit ? "saida" : "entrada"
                  }`}>
                  <div>
                    <span>{dayjs(transaction.createdAt).format("DD/MM")}</span>
                    <strong>{transaction.description}</strong>
                  </div>
                </Link>
                <div>
                  <Value color={transaction.isExit ? "negativo" : "positivo"}>
                    {formatMoney(transaction.value)}
                  </Value>
                  <button onClick={() => handleDelete(transaction)}>x</button>
                </div>
              </ListItemContainer>
            ))}
          </ul>
        )}
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
  align-items: stretch;
  overflow: hidden;

  p {
    color: #868686;
    font-size: 20px;
    max-width: 180px;
    text-align: center;
    flex-grow: 1;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

  ul {
    overflow: auto;
    padding-bottom: 10px;
  }

  article {
    box-shadow: rgba(255, 255, 255, 1) 0px -10px 8px;
    padding-top: 10px;
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

  div:last-child {
    display: flex;
    align-items: center;
    button {
      background: none;
      color: #868686;
      font-weight: normal;
      padding: 0;
      margin: 0;
      padding: 0 12px;
    }
  }
`;
