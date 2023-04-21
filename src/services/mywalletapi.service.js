import axios, { AxiosError } from "axios";

const client = axios.create({ baseURL: process.env.REACT_APP_API_URL });

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

async function createTransaction({ description, value, isExit, token }) {
  try {
    const res = await client.post(
      "/transaction",
      { description, value, isExit },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    throw mapError(err);
  }
}

async function editTransaction({ id, description, value, isExit, token }) {
  try {
    const res = await client.put(
      `/transaction/${id}`,
      { description, value, isExit },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    throw mapError(err);
  }
}

async function deleteTransaction({ id, token }) {
  try {
    const res = await client.delete(`/transaction/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw mapError(err);
  }
}

const myWalletApi = {
  signUp,
  logIn,
  getUserTransactions,
  getUserData,
  createTransaction,
  editTransaction,
  deleteTransaction,
};

export default myWalletApi;
