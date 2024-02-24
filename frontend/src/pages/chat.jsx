import React , { useState }from "react";
import Chat from "../Chat";
import NavbarListPage from "../NewFeedComponents/NavbarNewFeed";
import SidebarListPage from "../NewFeedComponents/SidebarNewFeed";

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
