const Avatar = ({ username, online }) => {
  return (
    <div className="bg-teal-500 relative text-white flex justify-center items-center font-semibold h-10 w-10 rounded-full">
      {username[0].toUpperCase()}
      {online ? (
        <div className="absolute bg-green-500 w-3 h-3 rounded-full border-2 border-white bottom-0 right-0"></div>
      ) : (
        <div className="absolute bg-gray-400 w-3 h-3 rounded-full border-2 border-white bottom-0 right-0"></div>
      )}
    </div>
  );
};

export default Avatar;
