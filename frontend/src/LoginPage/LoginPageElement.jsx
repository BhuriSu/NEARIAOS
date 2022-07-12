import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

export const LoginContainer = styled.div`
height: 800px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: #000;
@media screen and (max-width: 1024px) {
  height: 1380px;
}

@media screen and (max-width: 768px) {
  height: 1100px;
}

@media screen and (max-width: 480px) {
  height: 900px;
}

@media screen and (max-width: 375px) {
  height: 600px;
}

@media screen and (max-width: 360px) {
  height: 740px;
}

@media screen and (max-width: 320px) {
  height: 680px;
}
`;
export const LoginText = styled.div`
font-size: 2rem;
text-align: center;
color: #fff;
padding: 32px 0;
`;
export const ForgotButton = styled(LinkR)`
  white-space: nowrap;
  padding: 10px 22px;
  color:#05fff3;
  font-size: 16px;
  cursor: pointer;
`;
export const ButtonGoogle = styled.div`
border-radius: 10px;
background: #ff0048;
white-space: nowrap;
padding: 10px 22px;
color: #fff;
font-size: 16px;
cursor: pointer;
transition: all 0.2s ease-in-out;
display: inline-flex;
justify-content: center;
align-items: center;
margin-top: 20px;
width: 100%;
height: 48px;
`;
