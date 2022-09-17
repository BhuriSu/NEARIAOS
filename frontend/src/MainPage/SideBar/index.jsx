import React from 'react';
import {
  SidebarContainer, Icon, CloseIcon, SidebarWrapper,
  SidebarMenu, SidebarLink, SidebarRoute, SideBtnWrap,
} from './SidebarElements';
import LogInAndSignIn from '../../LogInAndSignIn';


function Sidebar({ isOpen, toggle }) {
  const handleClick = <LogInAndSignIn />;
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>

        <SidebarMenu>
          <SidebarLink to='/contact' onClick={toggle}>Contact</SidebarLink>
          <SidebarLink to='/premium' onClick={toggle}>Premium</SidebarLink>
        </SidebarMenu>

        <SideBtnWrap>
     
          <SidebarRoute onClick={handleClick} >Start</SidebarRoute>
       
        </SideBtnWrap>

      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
