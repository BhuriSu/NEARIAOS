import React from "react";
import { Fade } from "react-awesome-reveal";
import { Button } from "../ButtonElements";
import {
  InfoContainer, InfoWrapper, InfoRow, Column1, Column2, TextWrapper,
  TopLine, Heading, Subtitle, BtnWrap, ImgWrap, Img,
}
  from "./InfoElements";

function Info({
  imgStart, topLine, lightText, headline, darkText, description, buttonLabel, alt, img,
}) {
  return (
    <InfoContainer>
      <Fade direction="right">
        <InfoWrapper>

          <InfoRow imgStart={imgStart}>

            <Column1>
              <TextWrapper>
                <TopLine>{topLine}</TopLine>
                <Heading lightText={lightText}>{headline}</Heading>
                <Subtitle darkText={darkText}>{description}</Subtitle>
                <BtnWrap>
                  <Button to="/login">
                    {buttonLabel}
                  </Button>
                </BtnWrap>
              </TextWrapper>
            </Column1>

            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} />
              </ImgWrap>
            </Column2>

          </InfoRow>

        </InfoWrapper>
      </Fade>
    </InfoContainer>
  );
}

export default Info;
