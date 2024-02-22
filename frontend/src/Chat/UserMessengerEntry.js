import {
    ListItemAvatar,
    ListItemText,
    MenuItem,
  } from "@mui/material";
import React from "react";
import UserAvatar from "./UserAvatar"
import moment from "moment";
import { setSender} from "../redux/conversationSlice";
import { useDispatch } from 'react-redux';

const UserMessengerEntry = ({ conversation }) => {

  const dispatch = useDispatch();
  const recipient = conversation.recipient;
  const username = recipient.username;
  const selected = conversation.sender && conversation.sender.username === username;

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
          <UserAvatar height={45} width={45} username={username} />
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