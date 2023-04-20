import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import UserContext from "./contexts/user.context";
import { useEffect, useState } from "react";
import MyRoutes from "./routes";
import { useSession } from "./hooks/session.hooks.js";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  const currentUser = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => setUser(currentUser), [currentUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <PagesContainer>
          <BrowserRouter>
            <MyRoutes />
          </BrowserRouter>
        </PagesContainer>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  max-height: 100vh;
  padding: 25px;
`;
