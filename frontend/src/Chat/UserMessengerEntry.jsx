import {
  ListItemAvatar,
  ListItemText,
  MenuItem,
} from "@mui/material";
import React from "react";
import moment from "moment";
import UserAvatar from "../Profile/UserAvatar";

const UserMessengerEntry = (props) => {
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
          <UserAvatar   
          username={username}
          profilePicture={recipient.profilePicture}
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