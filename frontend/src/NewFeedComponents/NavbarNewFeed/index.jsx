import React from 'react';
import { NavbarNewFeedContainer, NavList, NavElements, NavLinks, MobileIcon, Profile, Find, Chat } from './NavbarNewFeedElements';
import { IconContext } from "react-icons/lib";
import { FaBars } from "react-icons/fa";
import profile from "../../images/profile.svg";
import FindPic from "../../images/find.svg";
import ChatPic from "../../images/chat.svg"
function NavbarNewFeed({ toggle }) {
  return (
    <IconContext.Provider value={{ color: "#fff" }}>
    <NavbarNewFeedContainer>
      <NavList>
 
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>

          <NavElements>

              <NavLinks to="/profile">
              <Profile src={profile} width="100" height="100" alt="" /> 
              </NavLinks>
              {' '} 
              <NavLinks to="/listUsers">
              <Find src={FindPic} width="100" height="100" alt="" /> 
              </NavLinks>
              {' '}
              <NavLinks to="/allChat">
              <Chat src={ChatPic} width="100" height="100" alt="" /> 
              </NavLinks>

          </NavElements>
      </NavList>
    </NavbarNewFeedContainer>
    </IconContext.Provider>
  );
}

export default NavbarNewFeed;
