import React, { useContext } from 'react';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';
import { ChatContainer, ChatInfo } from './ChatElements'
const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <ChatContainer>
      <ChatInfo>
        <span>{data.user?.displayName}</span>
      </ChatInfo>
      <Messages />
      <Input/>
    </ChatContainer>
  );
};

export default Chat;