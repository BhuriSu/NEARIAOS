import styled from "styled-components";

export const Container = styled.div`
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 600px;
  position: relative;
  z-index: 1;
  :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #000;
    z-index: 2;
  }
`;

export const Content = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: absolute;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FirstLine = styled.p`
  margin-top: 30px;
  color: #fff;
  font-size: 24px;
  text-align: center;
  max-width: 400px;
  margin-bottom: 260px;

  @media screen and (max-width: 768px) {
    font-size: 24px
  }
  @media screen and (max-width: 480px) {
    font-size: 18px
  }
  @media screen and (max-width: 375px) {
    font-size: 16px
  }
`;
export const Planet = styled.img`
width: 100%;
height: 100%;
-o-object-fit: cover;
object-fit: cover;
`;
