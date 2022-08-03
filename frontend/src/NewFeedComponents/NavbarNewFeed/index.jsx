import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarNewFeedContainer, NavList, ListLi } from './NavbarNewFeedElements';

function NavbarNewFeed() {
  return (
    <NavbarNewFeedContainer>
      <NavList>
          <ListLi>
              <Link to="/profile">
                <img
                  src="./images/profile.svg"
                  alt="Your profile"
                  title="Your profile"
                />
              </Link>
          </ListLi>

          <ListLi>
              <Link to="/listUsers">
                <img
                  src="./images/find.svg"
                  alt="Find buddy"
                  title="Find buddy"
                />
              </Link>
          </ListLi>

          <ListLi>
              <Link to="/allChat">
                <img
                  src="./images/chat.svg"
                  alt="ChatList"
                  title="ChatList"
                />
              </Link>
          </ListLi>
      </NavList>
    </NavbarNewFeedContainer>
  );
}

export default NavbarNewFeed;
