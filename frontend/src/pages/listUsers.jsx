import React from "react";
import ListUsers from "../ListPage";
import NavbarListPage from "../NewFeedComponents/NavbarNewFeed";

function ListPage() {

  return (
    <>
      <NavbarListPage/>
      <ListUsers />
    </>
  );
}

export default ListPage;
