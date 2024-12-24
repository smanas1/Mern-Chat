import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, serPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
  };
  return (
    <div className="h-screen bg-blue-50 flex  items-center">
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="w-64 mx-auto mb-16"
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          placeholder="Username"
          className="border block mb-3 w-full rounded-sm p-2 outline-blue-500 "
        />
        <input
          value={password}
          onChange={(e) => serPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Password"
          className="border block mb-3 w-full rounded-sm p-2  outline-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded text-white w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
