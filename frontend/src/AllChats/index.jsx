import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
      ref, query, limitToLast, onValue,
} from "firebase/database";
import database from "../firebase";
import ButtonChat from "./ButtonChat";
import Navbar from "../NewFeedComponents/NavbarNewFeed";
import Loader from "../NewFeedComponents/loader/Loader";

function AllChats() {
  const [cookies] = useCookies(["userName", "checked"]);
  const [chats, setChat] = useState(null);

  useEffect(() => {
    
    axios
      .get(`/database/${cookies.userName}`)
      .then(async ({ data }) => {
        await Promise.all(
          data.chats.map(async (el) => {
            const snapshot = onValue(query(ref(database, `${el.chat}`), limitToLast(1)));
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
          }),
        );
        data.chats.sort((a, b) => b.date - a.date);
        setChat(data.chats);
      });
  }, [cookies.userName, setChat]);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      
      <div style={{ width: "100%" }} className="main-cont">
        <Navbar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
          className="button-chat"
        >
          {chats ? (
            chats.map((el) => <ButtonChat key={el._id} chats={el} />)
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}

export default AllChats;
