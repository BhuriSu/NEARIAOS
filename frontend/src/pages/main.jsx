import React, { useState } from 'react';
import Footer from '../MainPage/Footer';
import FirstPage from '../MainPage/FirstPage';
import Info from '../MainPage/Info';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from '../MainPage/Info/Data';
import Navbar from '../MainPage/Navbar';
import OurPlatForm from '../MainPage/OurPlatform';
import Sidebar from '../MainPage/SideBar';
import Animation from '../MainPage/AnimationPicture';

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
