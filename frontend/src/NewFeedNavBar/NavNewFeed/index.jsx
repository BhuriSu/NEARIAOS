import React from 'react';
import { NavbarNewFeedContainer, NavList, NavElements, NavLinks, MobileIcon, Profile, Find, Chat } from './NavbarNewFeedElements';
import { IconContext } from 'react-icons/lib';
import { FaBars } from 'react-icons/fa';
import profile from '../../images/ImagesInListPage/profile.svg';
import FindPic from '../../images/ImagesInListPage/find.svg';
import ChatPic from '../../images/ImagesInListPage/chat.svg'
function NavbarNewFeed({ toggle }) {
  return (
    <IconContext.Provider value={{ color: '#fff' }}>
    <NavbarNewFeedContainer>
      <NavList>
 
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>

          <NavElements>

              <NavLinks to='/newAccount'>
              <Profile src={profile} width='100' height='100' alt='' /> 
              </NavLinks>
              {' '} 
              <NavLinks to='/listUser'>
              <Find src={FindPic} width='100' height='100' alt='' /> 
              </NavLinks>
              {' '}
              <NavLinks to='/chat'>
              <Chat src={ChatPic} width='100' height='100' alt='' /> 
              </NavLinks>

          </NavElements>
      </NavList>
    </NavbarNewFeedContainer>
    </IconContext.Provider>
  );
}

export default NavbarNewFeed;
