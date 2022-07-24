import React, { useState } from "react";
import Footer from "../components/Footer";
import FirstPage from "../components/FirstPage";
import Info from "../components/Info";
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from "../components/Info/Data";
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
      <FirstPage />
      <OurPlatForm />
      <Animation />
      <Info {...homeObjOne} />
      <Info {...homeObjTwo} />
      <Info {...homeObjThree} />
      <Info {...homeObjFour} />
      <Footer />

    </>

  );
}

export default Home;
