import React, { useEffect, useState } from "react";

const Chat = () => {
  const [ws, setWs] = useState(null);
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
    console.log(people);
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
      <div className="w-1/5 bg-white">users</div>
      <div className="flex flex-col w-full bg-blue-50 p-3">
        <div className="bg-white">header</div>
        <div className="flex-1 overflow-auto">messages</div>
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
      </div>
    </div>
  );
};

export default Chat;
