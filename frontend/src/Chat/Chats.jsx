import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { userAuthContext } from '../Context/UserAuthContext';
import { ChatContext } from '../Context/ChatContext';
import { db } from '../Firebase/firebase';
import { ChatContainer, UserChat, UserChatInfo } from './ChatElements';
const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(userAuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unSub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unSub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u });
  };

  return (
    <ChatContainer>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <UserChat
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt='' />
          <UserChatInfo>
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </UserChatInfo>
        </UserChat>
      ))}
    </ChatContainer>
  );
};

export default Chats;