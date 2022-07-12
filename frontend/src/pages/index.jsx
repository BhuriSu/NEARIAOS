import React, { useState } from "react";
import Footer from "../components/Footer";
import Page1 from "../components/Page1";
import Info from "../components/Info";
import { homeObjOne, homeObjTwo, homeObjThree } from "../components/Info/Data";
import Navbar from "../components/Navbar";
import OurPlatForm from "../components/OurPlatform";
import Sidebar from "../components/SideBar";
import Animation from "../components/AnimationPicture";

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (

    <>

      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Page1 />
      <OurPlatForm />
      <Animation />
      <Info {...homeObjOne} />
      <Info {...homeObjTwo} />
      <Info {...homeObjThree} />
      <Footer />

    </>

  );
}

export default Home;
