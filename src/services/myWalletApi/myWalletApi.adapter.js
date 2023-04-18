// Database de mentirinha
const user = {
  id: "123456",
  name: "Matheus",
  email: "matheuswagnerdossantos@outlook.com",
  password: "123123123",
};

const transactions = [
  {
    userId: "123456",
    date: "30/11",
    title: "Ifood",
    value: 120,
    isExit: true,
  },
  {
    userId: "123456",
    date: "12/11",
    title: "Mimo",
    value: 800,
    isExit: false,
  },
];

class MyWalletApiAdapter {
  constructor(url) {
    this.url = url;
  }

  getUserTransactions = async ({ userId }) => {
    return transactions.filter((t) => t.userId === userId);
  };

  logIn = async ({ email, password }) => {
    if (email !== user.email) {
      throw Error("O email não está cadastrado.");
    }
    if (password !== user.password) {
      throw Error("A senha informada está incorreta.");
    }
    return {
      name: user.name,
      email: user.email,
      token: "jfiohiuvshvciasj",
      id: user.id,
    };
  };

  signUp = async ({ email, password, name }) => {
    if (email === user.email) {
      throw Error("O email já existe.");
    }
    return {
      name: name,
      email: email,
      password: password,
    };
  };
}

export default MyWalletApiAdapter;
