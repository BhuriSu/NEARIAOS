import styled from 'styled-components';
import { Link as LinkR } from "react-router-dom";

export const NavbarNewFeedContainer = styled.div`
  background: ${({ scrollNav }) => (scrollNav ? "#fff" : "transparent")};
  height: 80px;
  margin-top: -80px;
  display:flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top:0;
  z-index:10;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;
export const NavList = styled.div`
display: flex;
height: 80px;
z-index: 1;
padding: 0 24px;
`;
export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;
export const NavElements = styled.div`
margin-top:50px;
@media screen and (max-width: 768px) {
  display: none;
}
`;
export const NavLinks = styled(LinkR)`
  cursor: pointer;
`;

export const Profile = styled.img`
  cursor: pointer;
  height: 100px;
  width: 100px;
`;

export const Find = styled.img`
  cursor: pointer;
  height: 100px;
  width: 100px;
`;

export const Chat = styled.img`
  cursor: pointer;
  height: 100px;
  width: 100px;
`;

