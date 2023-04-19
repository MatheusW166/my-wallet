import axios, { AxiosError } from "axios";

const client = axios.create({ baseURL: "http://localhost:5000/" });

class MyWalletApiAdapter {
  // getUserTransactions = async ({ userId }) => {
  //   return transactions.filter((t) => t.userId === userId);
  // };

  logIn = async ({ email, password }) => {
    try {
      const response = await client.post("/login", {
        email,
        password,
      });
      return response.data;
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        throw Error("Unknown error");
      }
      throw Error(err.response?.data);
    }
  };

  signUp = async ({ email, password, name }) => {
    try {
      await client.post("/register", { email, password, name });
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        throw Error("Unknown error");
      }
      throw Error(err.response?.data);
    }
  };
}

export default MyWalletApiAdapter;
