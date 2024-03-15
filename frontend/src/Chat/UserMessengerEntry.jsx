import {
  ListItemAvatar,
  ListItemText,
  MenuItem,
} from "@mui/material";
import React from "react";
import UserAvatar from "./UserAvatar";
import moment from "moment";
import { useSelector } from 'react-redux';

const UserMessengerEntry = (props) => {
  const { currentUser } = useSelector((state) => state.user) || {};
  const recipient = props.conversation.recipient;
  const selected =
    props.conservant && props.conservant.currentUser === recipient.currentUser;
  
  const handleClick = () => {
    props.setConservant(recipient);
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
          <UserAvatar height={45} width={45} src={currentUser.profilePicture} />
        </ListItemAvatar>
        <ListItemText
          primary={currentUser}
          secondary={moment(props.conversation.lastMessageAt).fromNow()}
        />
      </MenuItem>
    </>
  );
};

export default UserMessengerEntry;