import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
      ref, query, limitToLast, onValue, getDatabase
} from "firebase/database";
import ButtonChat from "./ButtonChat";
import Loader from "../NewFeedComponents/loader/Loader";
import { MainChat, ButtonChatDiv } from "./ButtonChatElements"

function AllChats() {
  const [cookies] = useCookies(["userName", "checked"]);
  const [chats, setChat] = useState(null);

  useEffect(() => {
    axios
      .get(`/database/${cookies.userName}`)
      .then(async ({ data }) => {
        await Promise.all(
          data.chats?.map((el) => {
            const database = getDatabase();
            const databaseRef = ref(database, `${el.chat}`);
            const snapshot = onValue(query(databaseRef, limitToLast(1)));
            snapshot.forEach((childSnapshot) => {
              const {
                nickname,
                msg,
                date,
              } = childSnapshot.val();
              el.date = date;
              el.nickname = nickname;
              el.lastMessage = msg;
            });
          }, {
            onlyOnce: true
          }),
        );
        data.chats.sort((a, b) => b.date - a.date);
        setChat(data.chats);
      });
  }, [setChat]);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <MainChat>
        <ButtonChatDiv width="200" height="200">
          {chats ? (
            chats?.map((el) => <ButtonChat key={el._id} chats={el} />)
          ) : (
            <Loader />
          )}
        </ButtonChatDiv>
      </MainChat>
    </div>
  );
}

export default AllChats;
