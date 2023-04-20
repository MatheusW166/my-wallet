import axios, { AxiosError } from "axios";

const client = axios.create({ baseURL: "http://localhost:5000" });

function mapError(err) {
  const defaultMessage = "Algo deu errado, tente novamente mais tarde";
  if (!(err instanceof AxiosError)) {
    return Error(defaultMessage);
  }
  if (err.message === "Network Error") {
    return Error("Sem conexão com o servidor");
  }
  const errorDetails = err.response?.data;
  if (!errorDetails) {
    return Error(defaultMessage);
  }
  return Error(errorDetails);
}

async function getUserData({ token }) {
  try {
    const response = await client.get("/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    throw mapError(err);
  }
}

async function getUserTransactions({ token }) {
  try {
    const response = await client.get("/transaction", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    throw mapError(err);
  }
}

async function logIn({ email, password }) {
  try {
    const response = await client.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    throw mapError(err);
  }
}

async function signUp({ email, password, name }) {
  try {
    await client.post("/register", { email, password, name });
  } catch (err) {
    throw mapError(err);
  }
}

const myWalletApi = { signUp, logIn, getUserTransactions, getUserData };

export default myWalletApi;
