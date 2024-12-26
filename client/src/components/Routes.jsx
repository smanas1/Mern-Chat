import { useContext } from "react";
import Register from "./Register";
import { UserContext } from "./UserContext";

const Routes = () => {
  const { username, id } = useContext(UserContext);

  if (username) {
    return <h1>Welcome {username}</h1>;
  }

  return <Register />;
};

export default Routes;
