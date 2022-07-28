import React, { useState } from "react";
import Navbar from "../MainPage/Navbar";
import Sidebar from "../MainPage/SideBar";
import Footer from "../MainPage/Footer";
import ContactForm from "../ContactForm";

function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <ContactForm />
      <Footer />
    </>
  );
}

export default ContactPage;
