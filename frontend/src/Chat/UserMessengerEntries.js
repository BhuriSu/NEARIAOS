import { Box, Divider, List, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { AiFillMessage } from "react-icons/ai";
import Loading from "./Loading";
import UserMessengerEntry from "./UserMessengerEntry";
import HorizontalStack from "./HorizontalStack";
import { BiSad } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { loadConversations } from "../redux/conversationSlice"; // Adjust the import path

const UserMessengerEntries = () => {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.conversation.conversations);
  const loading = useSelector((state) => state.conversation.loading);

  useEffect(() => {
    // Dispatch an action to load conversations when the component mounts
    dispatch(loadConversations());
  }, [dispatch]);

  return !loading ? (
    <>
      {conversations.length > 0 ? (
        <Stack>
          <HorizontalStack
            alignItems="center"
            spacing={2}
            sx={{ px: 2, height: "60px" }}
          >
            <AiFillMessage size={30} />
            <Typography>
              <b>Your Conversations</b>
            </Typography>
          </HorizontalStack>
          <Divider />
          <Box sx={{ height: "calc(100vh - 171px)" }}>
            <Box sx={{ height: "100%" }}>
              <List sx={{ padding: 0, maxHeight: "100%", overflowY: "auto" }}>
                {conversations.map((conversation) => (
                  <UserMessengerEntry
                    key={conversation.recipient.username}
                    conversation={conversation}
                  />
                ))}
              </List>
            </Box>
          </Box>
        </Stack>
      ) : (
        <Stack
          sx={{ height: "100%" }}
          justifyContent="center"
          alignItems="center"
          spacing={2}
          textAlign="center"
        >
          <BiSad size={60} />
          <Typography variant="h5">No Conversations</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: "70%" }}>
            Click 'Message' on another user's profile to start a conversation
          </Typography>
        </Stack>
      )}
    </>
  ) : (
    <Stack sx={{ height: "100%" }} justifyContent="center">
      <Loading />
    </Stack>
  );
};

export default UserMessengerEntries;