import React, { useState } from "react";
import Premium from "../Premium";
import Navbar from "../MainPage/Navbar";
import Sidebar from "../MainPage/SideBar";
import Footer from "../MainPage/Footer";

function PremiumPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Premium />
      <Footer />
    </>
  );
}

export default PremiumPage;
