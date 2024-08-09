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
        NEARIAOS is dealing and negotiation platform with user around you at specific place.
        </FirstLine>
      </Content>
    </Container>
  );
}

export default FirstPage;
