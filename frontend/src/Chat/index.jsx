import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { ref, child, getDatabase, onValue } from "firebase/database";
import Message from "../Message";
import "./chatForm.css";
import {
  BodyChat,
  NameText,
  Img,
  Window,
  HeaderChat,
  Chats,
  SendButton,
  ChatInput,
  ChatButton,
} from "./ChatFormElements";

function Chat(props) {
  const [cookies] = useCookies(["userName", "userNickname"]);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState({});
  const {
    chats, urlFriend, name, friend,
  } = props.location.state;
  const database = getDatabase();
  const chatRoom = child(ref(database, `${chats}`));
  const pushRoom = child(ref(database, `${friend}`));
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };
  useEffect(scrollToBottom, [messages]);
  useEffect(() => {
    const handleNewMessages = (snap) => {
      if (snap.val()) {
        setMessages(snap.val());
      }
    };
   const unsubscribe = onValue(pushRoom, handleNewMessages);
   return () => unsubscribe();
  }, [chatRoom, setMessages]);
  const handleMsgChange = (e) => setMsg(e.target.value);
  const handleKeyDown = () => {
    pushRoom.push({
      friend: cookies.userName,
      name: cookies.userNickname,
      date: Date.now(),
    });
    chatRoom.push({
      nickname: cookies.userNickname,
      msg,
      dateTime: new Date().toLocaleTimeString(),
      dateDay: new Date().toLocaleDateString(),
      date: Date.now(),
    });
    setMsg("");
  };
  return (
    <BodyChat>

      <HeaderChat>
        <Link to="/allChat" className="ChatBar">
          <img src="./images/backChat.svg" alt="back" />
        </Link>

        <NameText>{name}</NameText>
        
        <Img
          style={{ backgroundImage: `url(${urlFriend || "./infoUser.svg"}` }}
        />
      </HeaderChat>

      <Window>
        <Chats>
          <Message />

          {Object.keys(messages).map((message) => (
            <Message
              key={messages[message].dateTime}
              msg={messages[message].msg}
              dateDay={messages[message].dateDay}
              dateTime={messages[message].dateTime}
              nickname={messages[message].nickname}
            />
          ))}

        </Chats>
        <div
          className="to-bottom"
          ref={messagesEndRef}
          style={{ marginBottom: "50px" }}
        />
      </Window>

      <SendButton>
        <ChatInput
          type="text"
          id="message"
          placeholder="Write something.."
          onChange={handleMsgChange}
          value={msg}
        />
        {msg !== "" ? (
          <ChatButton id="send" onClick={handleKeyDown}>
            Send
          </ChatButton>
        ) : (
          <ChatButton id="send">
            Send
          </ChatButton>
        )}
      </SendButton>
    </BodyChat>
  );
}
export default Chat;
