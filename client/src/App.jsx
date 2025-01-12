import axios from "axios";
import { UserContextProvider } from "./components/UserContext";
import Routes from "./components/Routes";

function App() {
  axios.defaults.baseURL = "https://mern-chat-l2fq.onrender.com";
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
