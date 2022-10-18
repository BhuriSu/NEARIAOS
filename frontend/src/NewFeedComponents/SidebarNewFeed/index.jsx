import React from 'react';
import {
    SidebarNewFeedContainer, Icon, CloseIcon, SidebarNewFeedWrapper,
    SidebarNewFeedMenu, NavLinks, Profile, Find, Chat
} from './SidebarNewFeedElements';
import profile from '../../images/ImagesInListPage/profile.svg';
import FindPic from '../../images/ImagesInListPage/find.svg';
import ChatPic from '../../images/ImagesInListPage/chat.svg'

function SidebarNewFeed({ isOpen, toggle }) {

  return (
    <SidebarNewFeedContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarNewFeedWrapper>

        <SidebarNewFeedMenu>
              <NavLinks to='/profile'>
              <Profile src={profile} width='100' height='100' alt='' onClick={toggle} /> 
              </NavLinks>
              {' '} 
              <NavLinks to='/listUsers'>
              <Find src={FindPic} width='100' height='100' alt='' onClick={toggle} /> 
              </NavLinks>
              {' '}
              <NavLinks to='/chat'>
              <Chat src={ChatPic} width='100' height='100' alt='' onClick={toggle} /> 
              </NavLinks>
              <br/>

              
        </SidebarNewFeedMenu>
       
      </SidebarNewFeedWrapper>
    </SidebarNewFeedContainer>
  );
}

export default SidebarNewFeed;
