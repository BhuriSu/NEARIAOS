import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';
import SidebarChat from './ChatElements';
const Sidebar = () => {
  return (
    <SidebarChat>
      <Navbar />
      <Search/>
      <Chats/>
    </SidebarChat>
  );
};

export default Sidebar;