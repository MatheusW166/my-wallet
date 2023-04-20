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

  const { isLoading, data } = useQuery("transactions", async () => {
    try {
      return await myWalletApi.getUserTransactions({
        token: user.token,
      });
    } catch (err) {
      alert(err.message);
    }
  });

  function logOut() {
    setUser(null);
    userAuth.endSession();
  }

  const total = data?.reduce(
    (prev, curr) => prev + (curr.isExit ? -curr.value : curr.value),
    0
  );

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
        <ul>
          {data?.map((t, idx) => (
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
  overflow: hidden;

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
`;
