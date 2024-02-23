import { Card, useTheme } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UserAvatar from "../Profile/UserAvatar";
import HorizontalStack from "./HorizontalStack";
import { updateMessage } from "../redux/messageSlice"; 

const Message = () => {
  const sender = useSelector((state) => state.message.sender);
  const message = useSelector((state) => state.message.message);
  const theme = useTheme();
  const dispatch = useDispatch();

  let styles = {};
  if (message.direction === "to") {
    styles = {
      justifyContent: "flex-start",
    };
  } else if (message.direction === "from") {
    styles = {
      messageColor: theme.palette.grey["100"],
      justifyContent: "flex-end",
    };
  }

  const handleUpdateMessage = () => {
    // Dispatch an action to update the message
    const updatedMessage = { ...message, content: "Updated content" };
    dispatch(updateMessage(updatedMessage));
  };

  return (
    <HorizontalStack
      sx={{ paddingY: 1, width: "100%" }}
      spacing={2}
      justifyContent={styles.justifyContent}
      alignItems="flex-end"
    >
      {message.direction === "to" && (
        <UserAvatar username={sender.username} height={30} width={30} />
      )}

      <Card
        sx={{
          borderRadius: "25px",
          backgroundColor: styles.messageColor,
          borderWidth: "1px",
          paddingY: "12px",
          maxWidth: "70%",
          paddingX: 2,
        }}
      >
        {message.content}
        <button onClick={handleUpdateMessage}>Update Message</button>
      </Card>
    </HorizontalStack>
  );
};

export default Message;