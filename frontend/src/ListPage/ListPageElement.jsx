import styled from 'styled-components';

export const ListPageBackground = styled.div`
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

export const ToggleBox = styled.div`
text-align: center;
font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
background: transparent;
margin-top:20px;
-webkit-font-smoothing: antialiased;
`;