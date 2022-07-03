import React from 'react';
import Animated from '../animation/animated.gif';
import Color from '../images/color.svg';
import Card3 from '../images/card3.svg';
import {
  SerranoContainer, SerranoH1, SerranoWrapper, SerranoCard1,
  SerranoCard2, SerranoCard3, SerranoIcon, SerranoH2,
} from './SerranoElements';

function Serrano() {
  return (
    <SerranoContainer>

      <SerranoH1>Serrano mode</SerranoH1>

      <SerranoWrapper>

        <SerranoCard1>
          <SerranoIcon src={Animated} width="400" height="400" alt="" />
          <SerranoH2>Animated profile</SerranoH2>
        </SerranoCard1>

        <SerranoCard2>
          <SerranoIcon src={Color} width="400" height="400" alt="" />
          <SerranoH2>User can change card color</SerranoH2>
        </SerranoCard2>

        <SerranoCard3>
          <SerranoIcon src={Card3} width="400" height="400" alt="" />
          <SerranoH2>Coming soon</SerranoH2>
        </SerranoCard3>

      </SerranoWrapper>

    </SerranoContainer>
  );
}

export default Serrano;
