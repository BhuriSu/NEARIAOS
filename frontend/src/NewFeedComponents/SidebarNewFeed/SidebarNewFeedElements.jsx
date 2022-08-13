import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export const SidebarNewFeedContainer = styled.aside`
  position: fixed;
  z-index: 800;
  width: 100%;
  height: 100%;
  background: #000;
  display: grid;
  align-items: center;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;
export const CloseIcon = styled(FaTimes)`
  color: #fff;
`;
export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;
export const SidebarNewFeedWrapper = styled.div`
  color: #fff;
`;
export const SidebarNewFeedMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 80px);
  text-align: center;
  gap:70px;
  @media  screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60px);
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
