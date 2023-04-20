import myWalletApi from "../services/mywalletapi.service.js";

const KEY_SESSION_TOKEN = "session-token";

function currentSession() {
  return localStorage.getItem(KEY_SESSION_TOKEN);
}

async function logIn({ email, password }) {
  try {
    const user = await myWalletApi.logIn({
      email: email.trim(),
      password: password.trim(),
    });
    localStorage.setItem(KEY_SESSION_TOKEN, user.token);
    return user;
  } catch (err) {
    throw Error(err);
  }
}

function endSession() {
  localStorage.removeItem(KEY_SESSION_TOKEN);
}

const userAuth = { logIn, endSession, currentSession };

export default userAuth;
