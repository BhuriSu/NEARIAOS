import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarNewFeedContainer, NavList, ListLi } from './NavbarNewFeedElements';

function NavbarNewFeed() {
  return (
    <NavbarNewFeedContainer>
      <NavList>
        <ul style={{ padding: '0' }}>
          <ListLi>
            <li>
              <Link to="/profile">
                <img
                  className="navbar"
                  src="./images/profile.svg"
                  width="200"
                  height="200"
                  alt="Your profile"
                  title="Your profile"
                />
              </Link>
            </li>
          </ListLi>

          <ListLi>
            <li>
              <Link to="/listUsers">
                <img
                  src="./images/find.svg"
                  width="200"
                  height="200"
                  alt="Find buddy"
                  title="Find buddy"
                />
              </Link>
            </li>
          </ListLi>

          <ListLi>
            <li>
              <Link to="/allChat">
                {' '}
                <img
                  src="./images/chat.svg"
                  width="200"
                  height="200"
                  alt="ChatList"
                  title="ChatList"
                />
              </Link>
            </li>
          </ListLi>

        </ul>
      </NavList>
    </NavbarNewFeedContainer>
  );
}

export default NavbarNewFeed;
