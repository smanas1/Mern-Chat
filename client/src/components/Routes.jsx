import { useContext } from "react";
import { UserContext } from "./UserContext";
import LoginAndRegister from "./LoginAndRegister";

const Routes = () => {
  const { username, id } = useContext(UserContext);

  if (username) {
    return (
      <>
        <h1>Welcome {username}</h1>
      </>
    );
  }

  return <LoginAndRegister />;
};

export default Routes;
