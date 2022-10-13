import styled from "styled-components";

export const FromProcess = styled.div`
border-radius: 2%;
display: flex;
flex-direction: column;
text-align: center;
position: relative;
z-index: 100;
padding: 16px;
width: 320px;
margin: 0 auto;
`;
export const FromProcessContainer = styled.div`
height: 800px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background:#afdbfa;

@media screen and (max-width: 1024px) {
  height: 1400px;
}
@media screen and (max-width: 768px) {
  height: 1100px;
}

@media screen and (max-width: 480px) {
  height: 900px;
}
`;

