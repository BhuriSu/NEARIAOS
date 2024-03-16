import {
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Avatar
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment";

const UserMessengerEntry = (props) => {
  const [user] = useState({});
  const recipient = props.conversation.recipient;
  const username = recipient.username;
  const selected =
    props.conservant && props.conservant.username === recipient.username;
  
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
          <Avatar   
          username={username}
          src={user.profilePicture}
          alt={user.username} 
          height={45} 
          width={45} 
          />
        </ListItemAvatar>
        <ListItemText
          primary={username}
          secondary={moment(props.conversation.lastMessageAt).fromNow()}
        />
      </MenuItem>
    </>
  );
};

export default UserMessengerEntry;