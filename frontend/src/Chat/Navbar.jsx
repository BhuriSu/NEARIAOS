import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { userAuthContext } from '../Context/UserAuthContext';
import { NavbarChat, LogoChat, User } from './ChatElements';
const Navbar = () => {
  const {currentUser} = useContext(userAuthContext)

  return (
    <NavbarChat>
      <LogoChat>Chat List</LogoChat>
      <User>
        <img src={currentUser.photoURL} alt='' />
        <span>{currentUser.displayName}</span>
        <Link to="/listUsers" style={{ position: "relative" }}>
           <img src="./images/back.svg" width="100" height="100" alt="BackToListPage" title="BackToListPage" />
        </Link>
      </User>
    </NavbarChat>
  )
};

export default Navbar