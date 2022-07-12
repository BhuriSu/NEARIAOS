import styled from "styled-components";

export const RegisterContainer = styled.div`
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

export const RegisterText = styled.div`
font-size: 2rem;
text-align: center;
color: #fff;
padding: 32px 0;
`;
export const RegisterForm = styled.div`
border-radius: 10px;
padding: 16px;
width: 320px;
margin: 0 auto;
`;
