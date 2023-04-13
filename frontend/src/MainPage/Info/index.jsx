import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { Button } from '../ButtonElements';
import {
  InfoContainer, InfoWrapper, InfoRow, Column1, Column2, TextWrapper,
  TopLine, Heading, Subtitle, BtnWrap, ImgWrap, Img,
}
  from './InfoElements';

function Info({
  imgStart, topLine, headline, description, buttonLabel, alt, img,
}) {
  return (
    <InfoContainer>
      <Fade direction='right'>
        <InfoWrapper>

          <InfoRow imgStart={imgStart}>

            <Column1>
              <TextWrapper>
                <TopLine>{topLine}</TopLine>
                <Heading >{headline}</Heading>
                <Subtitle>{description}</Subtitle>
                <BtnWrap>
                  <Button to='/startForm'>
                    {buttonLabel}
                  </Button>
                </BtnWrap>
              </TextWrapper>
            </Column1>

            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} width='400' height='400'/>
              </ImgWrap>
            </Column2>

          </InfoRow>

        </InfoWrapper>
      </Fade>
    </InfoContainer>
  );
}

export default Info;
