const Avatar = ({ username }) => {
  return (
    <div className="bg-teal-500 text-white flex justify-center items-center font-semibold h-10 w-10 rounded-full">
      {username[0].toUpperCase()}
    </div>
  );
};

export default Avatar;
