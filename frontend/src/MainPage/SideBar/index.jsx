import React from 'react';
import {
  SidebarContainer, Icon, CloseIcon, SidebarWrapper,
  SidebarMenu, SidebarLink, SidebarRoute, SideBtnWrap,
} from './SidebarElements';
import ListPage from '../../ListPage';
import { useValue } from '../../Context';

function Sidebar({ isOpen, toggle }) {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
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
        {!currentUser ? (
          <SidebarRoute onClick={() => dispatch({ type: 'OPEN_LOGIN' })} >Start</SidebarRoute>
          ) : (
            <ListPage />
        )}
        </SideBtnWrap>

      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
