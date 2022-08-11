import styled from 'styled-components';

export const ListPageBackground = styled.div`
background-color: #000;
width:100%;
height: 1400px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
@media screen and (max-width: 768px) {
  height: 1100px;
}
@media screen and (max-width: 480px) {
  height: 1300px;
}
`;

export const ToggleBox = styled.div`
text-align: center;
font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
background: transparent;
margin-top:20px;
-webkit-font-smoothing: antialiased;
`;