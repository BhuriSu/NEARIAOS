import React from "react";
import {
    SidebarNewFeedContainer, Icon, CloseIcon, SidebarNewFeedWrapper,
    SidebarNewFeedMenu, NavLinks, Profile, Find, Chat
} from "./SidebarNewFeedElements";
import profile from "../../images/profile.svg";
import FindPic from "../../images/find.svg";
import ChatPic from "../../images/chat.svg"

function SidebarNewFeed({ isOpen, toggle }) {

  return (
    <SidebarNewFeedContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarNewFeedWrapper>

        <SidebarNewFeedMenu>
              <NavLinks to="/profile">
              <Profile src={profile} width="100" height="100" alt="" onClick={toggle} /> 
              </NavLinks>
              {' '} 
              <NavLinks to="/listUsers">
              <Find src={FindPic} width="100" height="100" alt="" onClick={toggle} /> 
              </NavLinks>
              {' '}
              <NavLinks to="/allChat">
              <Chat src={ChatPic} width="100" height="100" alt="" onClick={toggle} /> 
              </NavLinks>
              <br/>

              <div className="quitEdit" style={{ margin: "0 auto" }}>
              <NavLinks to="/listUsers" style={{ position: "relative" }}>
              <img src="./images/back.svg" width="100" height="100" alt="BackToListPage" title="BackToListPage" />
              </NavLinks>
              </div>
        </SidebarNewFeedMenu>

       
      </SidebarNewFeedWrapper>
    </SidebarNewFeedContainer>
  );
}

export default SidebarNewFeed;
