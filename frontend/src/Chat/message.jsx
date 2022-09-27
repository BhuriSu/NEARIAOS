import React, { useContext, useEffect, useRef } from 'react';
import { userAuthContext } from '../context/UserAuthContext';
import { ChatContext } from '../context/ChatContext';
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
      className={`${message.senderId === currentUser.uid && 'owner'}`}
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