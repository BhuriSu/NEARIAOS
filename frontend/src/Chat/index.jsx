import { Card, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Messages from "./Messages";

import UserMessengerEntries from "./UserMessengerEntries";
import { getConversations } from "../api/messages";
import { useNavigate } from "react-router-dom";
import { getAuth } from 'firebase/auth';
import { useUserAuth } from '../Context/UserAuthContext';

const Chat = () => {
  const [sender, setSender] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width, setWindowWidth] = useState(0);
  const mobile = width < 800;
  const auth = getAuth();
  const [user] = useUserAuth(auth);
  const navigate = useNavigate(); 
  const { state } = navigate();
  const newSender = state && state.user;

  const getConversation = (conversations, senderId) => {
    for (let i = 0; i < conversations.length; i++) {
      const conversation = conversations[i];
      if (conversation.recipient._id === senderId) {
        return conversation;
      }
    }
  };

  const fetchConversations = async () => {
    let conversations = await getConversations(user);
    if (newSender) {
      setSender(newSender);
      if (!getConversation(conversations, newSender._id)) {
        const newConversation = {
          _id: newSender._id,
          recipient: newSender,
          new: true,
          messages: [],
        };
        conversations = [newConversation, ...conversations];
      }
    }
    setConversations(conversations);
    setLoading(false);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  return (
    <Container>
      <Box>
        <Card sx={{ padding: 0 }}>
          <Grid
            container
            sx={{ height: "calc(100vh - 110px)" }}
            alignItems="stretch"
          >
            {!mobile ? (
              <>
                <Grid
                  item
                  xs={5}
                  sx={{
                    borderRight: 1,
                    borderColor: "divider",
                    height: "100%",
                  }}
                >
                  <UserMessengerEntries
                    sender={sender}
                    conversations={conversations}
                    setSender={setSender}
                    loading={loading}
                  />
                </Grid>

                <Grid item xs={7} sx={{ height: "100%" }}>
                  <Messages
                    sender={sender}
                    conversations={conversations}
                    setSender={setSender}
                    setConversations={setConversations}
                    getConversation={getConversation}
                  />
                </Grid>
              </>
            ) : !sender ? (
              <Grid
                item
                xs={12}
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                  height: "100%",
                }}
              >
                <UserMessengerEntries
                  sender={sender}
                  conversations={conversations}
                  setSender={setSender}
                  loading={loading}
                />
                <Box sx={{ display: "none" }}>
                  <Messages
                    sender={sender}
                    conversations={conversations}
                    setSender={setSender}
                    setConversations={setConversations}
                    getConversation={getConversation}
                  />
                </Box>
              </Grid>
            ) : (
              <Grid item xs={12} sx={{ height: "100%" }}>
                <Messages
                  sender={sender}
                  conversations={conversations}
                  setSender={setSender}
                  setConversations={setConversations}
                  getConversation={getConversation}
                  mobile
                />
              </Grid>
            )}
          </Grid>
        </Card>
      </Box>
    </Container>
  );
};

export default Chat;