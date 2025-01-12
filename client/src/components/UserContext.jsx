import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [selectId, setSelectId] = useState(null);
  useEffect(() => {
    axios
      .get("/profile")
      .then((res) => {
        setUsername(res.data.username);
        setId(res.data.userId);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{ username, setUsername, id, setId, selectId, setSelectId }}
    >
      {children}
    </UserContext.Provider>
  );
}
