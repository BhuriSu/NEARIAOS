import React from 'react';
import Animated from '../animation/animated.gif';
import Color from '../images/ImagesInPremiumPage/color.svg';
import Card3 from '../images/ImagesInPremiumPage/card3.svg';
import {
  PremiumContainer, PremiumH1,PremiumWrapper, PremiumCard1,
  PremiumCard2, PremiumCard3, PremiumIcon, PremiumH2, TextBelow
} from './PremiumElements';

function Premium() {
  return (
    <PremiumContainer>

      <PremiumH1>Premium mode</PremiumH1>

      <PremiumWrapper>

        <PremiumCard1>
          <PremiumIcon src={Animated} width='400' height='400' alt='' />
          <PremiumH2>Animated profile</PremiumH2>
        </PremiumCard1>

        <PremiumCard2>
          <PremiumIcon src={Color} width='400' height='400' alt='' />
          <PremiumH2>User can change card color</PremiumH2>
        </PremiumCard2>

        <PremiumCard3>
          <PremiumIcon src={Card3} width='400' height='400' alt='' />
          <PremiumH2>Randomly receiving payback 100%</PremiumH2>
        </PremiumCard3>

      </PremiumWrapper>
      
      <TextBelow>Coming Soon</TextBelow>
    </PremiumContainer>
  );
}

export default Premium;
