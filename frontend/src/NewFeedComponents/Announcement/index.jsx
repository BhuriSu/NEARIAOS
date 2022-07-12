import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  MainContainer,
  MessageContainer,
  NameAndDate,
  ImgExit,
  ExitBar,
} from "./AnnouncementElements";

function AnnouncementMessage(props) {
  const [cookies] = useCookies(["userName"]);
  const { user } = props;
  const [man, setMan] = useState(null);
  function getChatName(a, b) {
    if (a > b) {
      return `${a}+${b}`;
    }
    return `${b}+${a}`;
  }
  useEffect(() => {
    if (user) {
      setMan(user);
      setTimeout(setMan, 10000, null);
    }
  }, [user]);

  return (
    <>
      {man && (
        <MainContainer>
          <MessageContainer>
            <NameAndDate>
              <ImgExit src={user.url} alt={user.friend} />
              <div>{man.name}</div>
            </NameAndDate>
          </MessageContainer>
          <Link
            to={{
              pathname: "/chat",
              state: {
                chats: getChatName(cookies.userName, user.friend),
                name: user.name,
                urlFriend: user.url,
                friend: user.friend,
                url: "",
              },
            }}
          >
            {" "}
            Go chat
          </Link>
          <ExitBar src="./images/stop.svg" alt="close" />
        </MainContainer>
      )}
    </>
  );
}
export default AnnouncementMessage;
