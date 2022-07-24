import React from "react";
import FirstPic from "../../images/FirstPic.svg";
import {
  Container, Content, FirstLine, Planet
} from "./FirstPageElements";


function FirstPage() {
  return (
    <Container>
      <Content>
      
      <Planet src={FirstPic} alt="" /> 
        <FirstLine>
        Redunda is platform for chatting with stranger nearby you
        </FirstLine>
      </Content>
    </Container>
  );
}

export default FirstPage;
