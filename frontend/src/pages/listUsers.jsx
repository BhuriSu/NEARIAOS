import React , { useState }from "react";
import ListUsers from "../ListPage";
import NavbarListPage from "../NewFeedNavBar/NavbarNewFeed";
import SidebarListPage from "../NewFeedNavBar/SidebarNewFeed";

function ListPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <SidebarListPage isOpen={isOpen} toggle={toggle} />
    <NavbarListPage toggle={toggle} />
    <ListUsers />
    </>
  );
}

export default ListPage;
