import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { userAuthContext } from '../Context/UserAuthContext';
import { NavbarChat, LogoChat, User, BackToListPage } from './ChatElements';
const Navbar = () => {
  const {currentUser} = useContext(userAuthContext)

  return (
    <NavbarChat>
      <LogoChat>Chat List</LogoChat>
      <User>
        <img src={currentUser.photoURL} alt='' />
        <span>{currentUser.displayName}</span>
        <Link to='/listUsers' style={{ position: 'relative' }}>
          <BackToListPage>
          Back to ListPage
          </BackToListPage>
          </Link>
      </User>
    </NavbarChat>
  )
};

export default Navbar