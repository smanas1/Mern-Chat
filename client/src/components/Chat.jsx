import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";

const Chat = () => {
  const [ws, setWs] = useState(null);
  const [selecetedUser, setSelectedUser] = useState(null);
  const [onlinePeoples, setOnlinePeoples] = useState([]);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
  }, []);
  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    setOnlinePeoples(people);
  };
  function handleMessage(event) {
    const userOnline = JSON.parse(event.data);
    if ("online" in userOnline) {
      showOnlinePeople(userOnline.online);
    }
    console.log("new message");
  }
  return (
    <div className="h-screen flex ">
      <div className="w-72 bg-[#F7FBFC]">
        {/* Logo */}
        <div className="flex p-3 items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-blue-500"
          >
            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
          </svg>
          <h1 className="text-xl font-semibold ml-2 text-blue-500">YOR SA</h1>
        </div>
        {Object.keys(onlinePeoples).map((username, i) => (
          <div
            key={i}
            className={`border-t flex  items-center last:border-b capitalize px-5 relative py-2 ${
              selecetedUser === username ? "bg-blue-50 " : "hover:bg-blue-100"
            }`}
            onClick={() => setSelectedUser(username)}
          >
            {selecetedUser === username && (
              <div className="h-14 -ml-5 rounded-r-md w-1 absolute bg-blue-500"></div>
            )}
            <Avatar username={onlinePeoples[username]} />
            <span className="ml-2">{onlinePeoples[username]}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full bg-blue-50 p-3">
        <div className="flex-1 overflow-auto">
          {!selecetedUser && (
            <div className="flex justify-center items-center h-full">
              <h1 className="text-xl flex items-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
                Select User From Left Side
              </h1>
            </div>
          )}
        </div>
        {selecetedUser && (
          <div className=" flex ">
            <input
              type="text"
              placeholder="Type Your Message Here"
              className="border w-full p-2 rounded-md outline-none"
            />
            <div className="bg-blue-500 cursor-pointer text-white p-2 rounded-md ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
