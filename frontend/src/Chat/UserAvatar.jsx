import { Avatar } from "@mui/material";
import React from "react";

const UserAvatar = ({username, profilePicture, height, width }) => {

  return (
    <Avatar
      sx={{
        height: height,
        width: width,
      }}
      src={profilePicture}
      alt={username} 
    />
  );
};

export default UserAvatar;