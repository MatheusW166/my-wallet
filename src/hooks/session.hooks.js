import { useEffect, useState } from "react";
import userAuth from "../auth/user.auth.js";
import myWalletApi from "../services/mywalletapi.service.js";

function useSession() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const sessionToken = userAuth.currentSession();
    if (!sessionToken) return;
    myWalletApi
      .getUserData({ token: sessionToken })
      .then((user) => setCurrentUser({ ...user, token: sessionToken }))
      .catch((_) => setCurrentUser(null));
  }, []);
  return currentUser;
}

export { useSession };
