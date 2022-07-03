import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import {
  FooterContainer, FooterWrap, FooterLinkWrapper, FooterLinkItems, FooterLinkContainer,
  FooterLinkTitle, FooterLink, SocialIconLink, SocialIcons, SocialLogo, SocialMedia,
  SocialMediaWrap, WebsiteRights,
} from './FooterElements';

function Footer() {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinkContainer>

          <FooterLinkWrapper>

            <FooterLinkItems>
              <FooterLinkTitle>About Us</FooterLinkTitle>
              <FooterLink to="/privacy">Terms & Conditions</FooterLink>
            </FooterLinkItems>

            <FooterLinkItems>
              <FooterLinkTitle>Contact Us</FooterLinkTitle>

              <FooterLink to="/contact">Sponsorships</FooterLink>
            </FooterLinkItems>

          </FooterLinkWrapper>

          <FooterLinkWrapper>

            <FooterLinkItems>
              <FooterLinkTitle>Social Media</FooterLinkTitle>

              <FooterLink to="/">Twitter</FooterLink>
            </FooterLinkItems>

          </FooterLinkWrapper>

        </FooterLinkContainer>

        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/" onClick={toggleHome}>
              Redunda
            </SocialLogo>
            <WebsiteRights>
              Redunda ©
              {new Date().getFullYear()}
              {' '}
              All rights reserved.
            </WebsiteRights>
            <SocialIcons>

              <SocialIconLink href="/" target="_blank" aria-label="Twitter">
                <FaTwitter />
              </SocialIconLink>

            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>

      </FooterWrap>
    </FooterContainer>
  );
}

export default Footer;
