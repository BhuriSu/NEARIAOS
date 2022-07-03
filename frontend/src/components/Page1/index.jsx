import React from 'react';
import {
  P1Container, P1Content, P1P, Color, Img,
} from './Page1Elements';
import FirstPic from '../../images/firstPic.svg';

function Page1() {
  return (
    <P1Container id="home">
      <P1Content>
        <Img src={FirstPic} alt="" />
        <P1P>
          Redunda is platform for chatting with stranger
          <Color>nearby you</Color>
        </P1P>
      </P1Content>
    </P1Container>
  );
}

export default Page1;
