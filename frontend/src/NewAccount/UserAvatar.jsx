
import React from "react";
import { Avatar } from "@mui/material";

const UserAvatar = ({ username, height, width, profilePicture }) => {
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