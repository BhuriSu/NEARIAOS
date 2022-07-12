import React from "react";
import "./message.css";
import { useCookies } from "react-cookie";
import { MessageBody, MessageChat, MessageText } from "./MessageElements";

function Message(props) {
  const [cookies] = useCookies(["userName", "userNickname"]);

  const { msg, dateTime, nickname } = props;

  return (
    <MessageBody>
      <MessageChat>
        {cookies.userNickname === nickname ? (
          <div className="mine messages">
            <small style={{ color: " #fff", margin: "0 auto" }}>
              {dateTime}
            </small>
            <MessageText>{msg}</MessageText>
          </div>
        ) : (
          <div className="yours messages">
            <small style={{ color: " #fff", margin: "0 auto" }}>
              {dateTime}
            </small>

            <MessageText>
              {" "}
              {msg}
            </MessageText>
          </div>
        )}
      </MessageChat>
    </MessageBody>
  );
}

export default Message;
