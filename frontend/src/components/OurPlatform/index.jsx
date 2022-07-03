import React from 'react';
import { Fade } from 'react-awesome-reveal';
import Icon1 from '../../images/our1.svg';
import Icon2 from '../../images/our2.svg';
import Icon3 from '../../images/our3.svg';
import {
  ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard1,
  ServicesCard2, ServicesCard3, ServicesIcon, ServicesH2, ServicesP,
} from './ServiceElements';

function Services() {
  return (
    <ServicesContainer id="services">
      <Fade direction="left">
        <ServicesH1>Our platform</ServicesH1>

        <ServicesWrapper>

          <ServicesCard1>
            <ServicesIcon src={Icon1} width="600" height="600" alt="" />
            <ServicesH2>Leisure friend</ServicesH2>
            <ServicesP>Search your new friend if you want someone with you at some time</ServicesP>
          </ServicesCard1>

          <ServicesCard2>
            <ServicesIcon src={Icon2} width="600" height="600" alt="" />
            <ServicesH2>Let share a fee</ServicesH2>
            <ServicesP>share a fee with someone maybe preventing from dangerous driver</ServicesP>
          </ServicesCard2>

          <ServicesCard3>
            <ServicesIcon src={Icon3} width="600" height="600" alt="" />
            <ServicesH2>Make profit by helping</ServicesH2>
            <ServicesP>Someone have a problem immediately you can negotiate with them</ServicesP>
          </ServicesCard3>

        </ServicesWrapper>
      </Fade>
    </ServicesContainer>
  );
}

export default Services;
