import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import {
  FooterContainer, FooterWrap, FooterLinkWrapper, FooterLinkItems, FooterLinkContainer,
  FooterLinkTitle, FooterLink, SocialLogo, WebsiteRights,
} from './FooterElements';

function Footer() {
  const ToggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinkContainer>

          <FooterLinkWrapper>

            <FooterLinkItems>
              <FooterLinkTitle>About Us</FooterLinkTitle>
              <FooterLink to='/privacy' >Privacy and Cookie Policy</FooterLink>
            </FooterLinkItems>

            <FooterLinkItems>
              <FooterLinkTitle>Contact Us</FooterLinkTitle>
              <FooterLink to='/contact'>Sponsorships</FooterLink>
            </FooterLinkItems>

          </FooterLinkWrapper>

        </FooterLinkContainer>

            <SocialLogo to='/' onClick={ToggleHome}>
              NEARIAOS
            </SocialLogo>

            <WebsiteRights>
              NEARIAOS ©
              {new Date().getFullYear()}
              All rights reserved.
            </WebsiteRights>

      </FooterWrap>
    </FooterContainer>
  );
}

export default Footer;
