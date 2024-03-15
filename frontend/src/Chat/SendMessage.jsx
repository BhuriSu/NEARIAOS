import {
  Button,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { sendMessage } from "../api/messages";
import HorizontalStack from "./util/HorizontalStack";

const SendMessage = () => {
  const [content, setContent] = useState("");

  const handleSendMessage = () => {
    sendMessage(content);
    setContent("");
  };
  const handleKeyDown = (e) => {
    if (content.length > 0) {
      handleSendMessage();
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
      <HorizontalStack>
        <TextField
          onChange={(e) => setContent(e.target.value)}
          label="Send a message..."
          fullWidth
          value={content}
          autoComplete="off"
          size="small"
          onKeyDown={handleKeyDown}
        />

        <Button onClick={handleSendMessage} disabled={content.length === 0}>
          Send
        </Button>
      </HorizontalStack>
    </Stack>
  );
};

export default SendMessage;