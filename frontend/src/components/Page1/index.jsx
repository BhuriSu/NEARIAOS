import React from "react";
import {
  Container, Content, P, Color, Img,
} from "./Page1Elements";
import FirstPic from "../../images/firstPic.svg";

function Page1() {
  return (
    <Container id="home">
      <Content>
        <Img src={FirstPic} alt="" />
        <P>
        <Color> Redunda </Color> is platform for chatting with stranger nearby you
        </P>
      </Content>
    </Container>
  );
}

export default Page1;
