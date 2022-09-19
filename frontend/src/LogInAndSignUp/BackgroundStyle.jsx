import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const BackgroundContainer = styled.div`
  height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000;
  @media screen and (max-width: 768px) {
    height: 1100px;
  }
  @media screen and (max-width: 480px) {
    height: 1300px;
  }
 `;
export const Logo = styled(LinkR)`
color:#fff;
justify-self: flex-start;
cursor: pointer;
font-size: 2rem;
display: flex;
align-items: center;
margin-left: 6px;
font-weight: bold;
text-decoration: none;
font-family: 'Bungee', cursive;
`;