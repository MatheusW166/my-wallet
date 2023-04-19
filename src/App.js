import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import UserContext from "./contexts/user.context";
import { useState } from "react";
import MyRoutes from "./routes";

export default function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("my-wallet"))
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <PagesContainer>
        <BrowserRouter>
          <MyRoutes />
        </BrowserRouter>
      </PagesContainer>
    </UserContext.Provider>
  );
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  max-height: 100vh;
  padding: 25px;
`;
