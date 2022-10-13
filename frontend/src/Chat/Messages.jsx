import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../Context/ChatContext';
import  db  from '../Firebase/firebase';
import Message from './Message';
import { MessagesContainer } from './ChatElements';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages)

  return (
    <MessagesContainer>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </MessagesContainer>
  );
};

export default Messages;