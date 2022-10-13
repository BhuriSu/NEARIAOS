import React, { useContext, useEffect, useRef } from 'react';
import { userAuthContext } from '../Context/UserAuthContext';
import { ChatContext } from '../Context/ChatContext';
import { MessageInfo, MessageContent, MessageContainer } from './ChatElements'
const Message = ({ message }) => {
  const { currentUser } = useContext(userAuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <MessageContainer
      ref={ref}
      owner={message.senderId === currentUser.uid}  
    >
      <MessageInfo>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=''
        />
        <span>just now</span>
      </MessageInfo>
      <MessageContent>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt='' />}
      </MessageContent>
    </MessageContainer>
  );
};

export default Message;