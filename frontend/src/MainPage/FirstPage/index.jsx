import React from 'react';
import FirstPic from '../../images/ImagesInMainPage/FirstPic.svg';
import {
  Container, Content, FirstLine, Planet
} from './FirstPageElements';


function FirstPage() {
  return (
    <Container>
      <Content>
      <Planet src={FirstPic} alt='' /> 
        <FirstLine>
        NEARIAOS is platform for chatting with users near you at a specific place.
        </FirstLine>
      </Content>
    </Container>
  );
}

export default FirstPage;
