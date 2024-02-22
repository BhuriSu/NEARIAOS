import React from "react";

const UserAvatar = ({ imageFile }) => {
  return (
    <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
      <img
        src={imageFile}
        alt='user'
        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]`}
      />
    </div>
  );
};

export default UserAvatar;