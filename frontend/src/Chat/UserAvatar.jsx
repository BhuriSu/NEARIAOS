import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from 'react-redux';

const UserAvatar = ({ height, width }) => {
    const { currentUser } = useSelector((state) => state.user) || {};
  return (
    <Avatar
      sx={{
        height: height,
        width: width,
        backgroundColor: "lightgray",
      }}
      src={(currentUser && currentUser.profilePicture) || ''}
    />
  );
};

export default UserAvatar;