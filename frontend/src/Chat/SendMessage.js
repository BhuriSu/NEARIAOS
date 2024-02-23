import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../api/messages";
import { setContent, clearContent } from "../redux/messageSlice";
import HorizontalStack from "./HorizontalStack";

const SendMessage = () => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.messages.content);

  const handleSendMessage = () => {
    dispatch(sendMessage(content));
    dispatch(clearContent());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && content.length > 0) {
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
          onChange={(e) => dispatch(setContent(e.target.value))}
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