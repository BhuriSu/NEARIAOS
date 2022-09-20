import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const BackgroundContainer = styled.div`
background-color: #000;
height: 700px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;


@media screen and (max-width: 1024px) {
  height: 1400px;
}
@media screen and (max-width: 768px) {
  height: 1100px;
}
@media screen and (max-width: 412px) {
  height: 914px;
}
@media screen and (max-width: 375px) {
  height: 812px;
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