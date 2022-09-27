import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { userAuthContext } from '../context/UserAuthContext';

const Navbar = () => {
  const {currentUser} = useContext(userAuthContext)

  return (
    <div className='navbar'>
      <span className='logo'>Chat List</span>
      <div className='user'>
        <img src={currentUser.photoURL} alt='' />
        <span>{currentUser.displayName}</span>
        <Link to="/listUsers" style={{ position: "relative" }}>
           <img src="./images/back.svg" width="100" height="100" alt="BackToListPage" title="BackToListPage" />
        </Link>
      </div>
    </div>
  )
};

export default Navbar