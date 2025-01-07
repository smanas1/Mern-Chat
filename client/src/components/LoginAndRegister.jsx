import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { toast, ToastContainer } from "react-toastify";

const LoginAndRegister = () => {
  const [username, setUsername] = useState("");
  const [password, serPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isLogin ? "/login" : "/register";
    axios
      .post(url, { username, password })
      .then((res) => {
        setLoggedInUsername(username);
        setId(res.data._id);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  return (
    <div className="h-screen bg-blue-50 flex  items-center">
      <ToastContainer theme="colored" />
      <form
        action="submit"
        onSubmit={handleSubmit}
        x
        className="w-64 mx-auto mb-16"
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          placeholder="Username"
          className="border block mb-3 w-full rounded p-2 outline-blue-500 "
        />
        <input
          value={password}
          onChange={(e) => serPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Password"
          className="border block mb-3 w-full rounded p-2  outline-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded text-white w-full"
        >
          {isLogin ? "Login" : "Register"}
        </button>
        <div className="text-center mt-3">
          <p>
            Click here to{" "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 cursor-pointer underline font-semibold"
            >
              {isLogin ? "Register" : "Login"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginAndRegister;
