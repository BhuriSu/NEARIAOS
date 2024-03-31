import { Card, useTheme, Avatar } from "@mui/material";
import React, {useState} from "react";
import HorizontalStack from "./HorizontalStack";

const Message = (props) => {
  const username = props.conservant.username;
  const message = props.message;
  const theme = useTheme();
  const [user] = useState({});
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

  return (
    <HorizontalStack
      sx={{ paddingY: 1, width: "100%" }}
      spacing={2}
      justifyContent={styles.justifyContent}
      alignItems="flex-end"
    >
      {message.direction === "to" && (
        <Avatar   
        username={username}
        src={user.profilePicture}
        alt={user.username} 
        height={30} width={30} 
        />
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
      </Card>
    </HorizontalStack>
  );
};

export default Message;