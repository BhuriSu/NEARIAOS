import styled from "styled-components";

export const MainContainer = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
width: 400px;
height: 120px;
border-radius: 8px;
margin-left: 20px;
opacity: 0.7;
transition: 1s;
background-color: #ebecf0e8;
color: rgb(124, 42, 255);
:hover {
    opacity: 1;
  }
@media screen and (max-width: 1200px) {
  width: 280px;
  height: 100px;
    }
@media screen and (max-width: 600px) {
   width: 250px;
   height: 60px;
    }
`;
export const MessageContainer = styled.div`
display: flex;
`;
export const NameAndDate = styled.div`
display: flex;
display: block;
`;
export const ImgExit = styled.div`
width: 60px;
height: 60px;
border-radius: 50%;
position: relative;
@media screen and (max-width: 1200px) {
    width: 70px;
    height: 70px;
    margin: 5px 0 0 5px;
}
@media screen and (max-width: 600px) {
    width: 50px;
    height: 50px;
    margin: 5px 0 0 5px;
}
`;
export const ExitBar = styled.div`
color: rgb(124, 42, 255);
width: 30px;
height: 30px;
`;
