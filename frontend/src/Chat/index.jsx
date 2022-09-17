import React, { useState, useEffect, useRef } from 'react';
import Message from './message';
import SendMessage from './sendmessage';
import db from '../Firebase/firebase';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import styled from "styled-components";

const MainMessageDiv = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
`;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <MainMessageDiv>
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
      </MainMessageDiv>
      {/* Send Message Component */}
      <SendMessage scroll={scroll} />
      <span ref={scroll}></span>
    </>
  );
};

export default Chat;