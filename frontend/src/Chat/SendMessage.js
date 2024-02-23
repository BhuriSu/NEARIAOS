import {
  Button,
  TextField,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../api/messages";

const SendMessage = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  
  const handleSendMessage = () => {
    if (content.length > 0) {
      dispatch(sendMessage(content));
      setContent("");
    }
  };

  return (
    <Stack
      sx={{
        m: 2,
        height: "40px",
      }}
      justifyContent="center"
    >
      <TextField
        onChange={(e) => setContent(e.target.value)}
        label="Send a message..."
        fullWidth
        value={content}
        autoComplete="off"
        size="small"
        onKeyPress={(e) => {
          if (e.key === "Enter" && content.length > 0) {
            handleSendMessage();
          }
        }}
      />

      <Button onClick={handleSendMessage} disabled={content.length === 0}>
        Send
      </Button>
    </Stack>
  );
};

export default SendMessage;