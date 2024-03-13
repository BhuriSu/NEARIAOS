import {
  Divider,
  IconButton,
  Stack,
  Typography,
  Avatar
} from "@mui/material";
import { Box } from "@mui/system";
import { getAuth } from 'firebase/auth';
import { useUserAuth } from '../Context';
import { getConversations, getMessages, sendMessage } from '../api/messages';
import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretLeft, AiFillMessage } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socketHelper";
import Loading from "./Loading";
import Message from "./Message";
import SendMessage from "./SendMessage";
import HorizontalStack from "./HorizontalStack";
import { setMessages, setSender } from "../redux/messageSlice"; 
import { setConversations, updateConversationLastMessage, updateConversationMessages } from "../redux/conversationSlice";
  const Messages = () => {
    
    const auth = getAuth();
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);
    const [user] = useUserAuth(auth);
    const conversations = useSelector((state) => state.conversations);
    const sender = useSelector((state) => state.sender);
    const messages = useSelector((state) => state.messages);
    const conversationsRef = useRef(conversations);
    const messagesRef = useRef(messages);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (sender) {
        dispatch(getMessages(user, sender._id));
      }
    }, [sender, dispatch, user]);
  
    const conversation = conversations && sender && getConversations(conversations, sender._id);

  
    const setDirection = (messages) => {
      messages.forEach((message) => {
        if (message.sender._id === user.userId) {
          message.direction = "from";
        } else {
          message.direction = "to";
        }
      });
    };
  
    const fetchMessages = async () => {
      if (conversation) {
        if (conversation.new) {
          setLoading(false);
          dispatch(setMessages(conversation.messages));
          return;
        }
  
        setLoading(true);
  
        const data = await getMessages(user, conversation._id);
  
        setDirection(data);
  
        if (data && !data.error) {
          dispatch(setMessages(data));
        }
  
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (sender) {
        dispatch(fetchMessages(sender));
      }
    }, [dispatch, sender]);
  
    useEffect(() => {
      if (messages) {
        scrollToBottom();
      }
    }, [messages]);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView();
    };
  
    const handleSendMessage = async (content) => {
      const newMessage = { direction: "from", content };
      const newMessages = [newMessage, ...messages];
  
      if (conversation.new) {
        // Assuming conversation is a slice of state, you may need to dispatch an action to update it
        // Example action: dispatch(updateConversationMessages(conversation._id, [...conversation.messages, newMessage]));
      }
  
      let newConversations = conversations.filter(
        (conversationCompare) => conversation._id !== conversationCompare._id
      );
  
      newConversations.unshift(conversation);
  
      // Dispatch action to update conversations in Redux store
      dispatch(setConversations(newConversations));
  
      // Assuming setMessages is a local state, you may not need this if messages are managed by Redux
      dispatch(setMessages(newMessages));
  
      // Dispatch action to send message
      dispatch(sendMessage(user, newMessage, conversation.recipient._id));
  
      socket.emit(
        "send-message",
        conversation.recipient._id,
        user.username,
        content
      );
    };
  

    const handleReceiveMessage = (senderId, username, content) => {
      const newMessage = { direction: "to", content };
  
      const conversation = getConversations(conversationsRef.current, senderId);
  
      console.log(username + " " + content);
  
      if (conversation) {
        let newMessages = [newMessage];
        if (messagesRef.current) {
          newMessages = [...newMessages, ...messagesRef.current];
        }
  
        // Dispatch action to update messages in Redux store
        dispatch(updateConversationMessages(conversation._id, newMessages));
  
        if (conversation.new) {
          // Dispatch action to update conversation in Redux store
          dispatch(updateConversationLastMessage(conversation._id, Date.now()));
        }
  
        let newConversations = conversationsRef.current.filter(
          (conversationCompare) => conversation._id !== conversationCompare._id
        );
  
        newConversations.unshift(conversation);
  
        // Dispatch action to update conversations in Redux store
        dispatch(setConversations(newConversations));
      } else {
        const newConversation = {
          _id: senderId,
          recipient: { _id: senderId, username },
          new: true,
          messages: [newMessage],
          lastMessageAt: Date.now(),
        };
  
        // Dispatch action to add new conversation to Redux store
        dispatch(setConversations([newConversation, ...conversationsRef.current]));
      }
  
      scrollToBottom();
    };
  
    useEffect(() => {
      socket.on("receive-message", handleReceiveMessage);
    }, []);
  
    return sender ? (
      <>
        {messages && conversation && !loading ? (
          <>
            <HorizontalStack
              alignItems="center"
              spacing={2}
              sx={{ px: 2, height: "60px" }}
            >
              {
                <IconButton
                  onClick={() => dispatch(setSender(null))}
                  sx={{ padding: 0 }}
                >
                  <AiFillCaretLeft />
                </IconButton>
              }
              <Avatar
              src={sender.profilePicture}
              alt=''
              username={sender.username}
              sx={{
                height: 30,
                width: 30,
                backgroundColor: "lightgray",
               }}
              />
              <Typography>
                <Link to={"/users/" + sender.username}>
                  <b>{sender.username}</b>
                </Link>
              </Typography>
            </HorizontalStack>
            <Divider />
            <Box sx={{ height: "calc(100vh - 240px)" }}>
              <Box sx={{ height: "100%" }}>
                <Stack
                  sx={{ padding: 2, overflowY: "auto", maxHeight: "100%" }}
                  direction="column-reverse"
                >
                  <div ref={messagesEndRef} />
                  {messages.map((message, i) => (
                    <Message sender={sender} message={message} key={i} />
                  ))}
                </Stack>
              </Box>
            </Box>
            <SendMessage onSendMessage={handleSendMessage} />
            {scrollToBottom()}
          </>
        ) : (
          <Stack sx={{ height: "100%" }} justifyContent="center">
            <Loading />
          </Stack>
        )}
      </>
    ) : (
      <Stack
        sx={{ height: "100%" }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <AiFillMessage size={80} />
        <Typography variant="h5">PostIt Messenger</Typography>
        <Typography color="text.secondary">
          Privately message other users on PostIt
        </Typography>
      </Stack>
    );
  };
  
  export default Messages;