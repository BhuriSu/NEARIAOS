import React from 'react';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { animateScroll as scroll } from 'react-scroll';
import { useValue } from '../../Context';
import ListPage from '../../ListPage';
import {
  Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavLinks, NavItem, NavBtn, NavBtnLink,
} from './NavbarElements';

function Navbar({ toggle }) {
  const ToggleHome = () => {
    scroll.scrollToTop();
  };
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <Nav>
        <NavbarContainer>
          <NavLogo to='/' onClick={ToggleHome}>NEARIAOS</NavLogo>

          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>

          <NavMenu>

            <NavItem>
              <NavLinks to='/contact'>Contact</NavLinks>
            </NavItem>

            <NavItem>
              <NavLinks to='/premium'>Premium</NavLinks>
            </NavItem>

          </NavMenu>

          <NavBtn>
          {!currentUser ? (
            <NavBtnLink onClick={() => dispatch({ type: 'OPEN_LOGIN' })} data-cy='start-button'>Start</NavBtnLink>
          ) : (
            <ListPage />
          )}
          </NavBtn>
           
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
  );
}

export default Navbar;
