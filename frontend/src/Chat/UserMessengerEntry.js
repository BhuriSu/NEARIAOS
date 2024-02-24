import {
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Avatar,
  } from "@mui/material";
import React from "react";
import moment from "moment";
import { setSender } from "../redux/messageSlice";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const UserMessengerEntry = ({ conversation }) => {

  const dispatch = useDispatch();
  const recipient = conversation.recipient;
  const username = recipient.username;
  const selected = conversation.sender && conversation.sender.username === username;
  const { currentUser } = useSelector((state) => state.user);
  const handleClick = () => {
    dispatch(setSender(recipient));
  };

  return (
    <>
      <MenuItem
        onClick={handleClick}
        sx={{ padding: 2 }}
        divider
        disableGutters
        selected={selected}
      >
        <ListItemAvatar>
        <Avatar
          src={currentUser.profilePicture}
          alt=''
          username={currentUser.username}
          sx={{
            height: 45,
            width: 45,
            backgroundColor: "lightgray",
          }}
        />
        </ListItemAvatar>
        <ListItemText
          primary={username}
          secondary={moment(conversation.lastMessageAt).fromNow()}
        />
      </MenuItem>
    </>
  );
};
  
export default UserMessengerEntry;