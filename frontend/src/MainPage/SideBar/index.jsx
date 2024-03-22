import React from 'react';
import {
  SidebarContainer, Icon, CloseIcon, SidebarWrapper,
  SidebarMenu, SidebarLink, SidebarRoute, SideBtnWrap,
} from './SidebarElements';


function Sidebar({ isOpen, toggle}) {
 
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
          <SidebarRoute to='/startForm' data-cy='start-button'>Start</SidebarRoute>
        </SideBtnWrap>
     
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
