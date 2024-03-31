import React , { useState }from "react";
import Chat from "../Chat";
import NavbarListPage from "../NewFeedNavBar/NavNewFeed";
import SidebarListPage from "../NewFeedNavBar/SidebarNewFeed";

function ChatPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <SidebarListPage isOpen={isOpen} toggle={toggle} />
    <NavbarListPage toggle={toggle} />
    <Chat />
    </>
  );
}

export default ChatPage;
