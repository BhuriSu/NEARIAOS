import styled from "styled-components";

export const BodyChat = styled.div`
font-family: helvetica;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 8px;
justify-content: center;
`
export const NameText = styled.div`
align-self: center;
color: #fff;
font-size: 35px;
@media screen and (max-width: 1200px) {
    font-size: 30px; 
}
@media screen and (max-width: 600px) {
    font-size: 25px;
}
`
export const Img = styled.div`
align-self: center;
margin-bottom: 5px;
width: 100px;
height: 100px;
border-radius: 50%;
background-repeat: no-repeat;
background-size: cover;
background-position: center;
cursor: pointer;
@media screen and (max-width: 1200px) {
        height: 90px;
        width: 90px;  
}
@media screen and (max-width: 600px) {
    height: 80px;
    width: 80px;
}
`
export const Window = styled.div`
justify-content: center;
overflow-y: scroll;
-ms-overflow-style: none;
margin-top: 2%;
scroll-margin-top: 65%;
align-self: center;
border-radius: 10px;
height: 65%;
width: 50%;
::-webkit-scrollbar {
    display: none;
  }
@media screen and (max-width: 1200px) {
   width: 75%; 
}
@media screen and (max-width: 600px) {
   width: 99%;
}
`

export const HeaderChat = styled.div`
display: flex;
justify-content: space-between;
width: 50%;
margin: 0 auto;
padding-top: 2%;
border-bottom: solid 2px #fff;
@media screen and (max-width: 1200px) {  
      width: 75%;  
}
@media screen and (max-width: 600px) {
      width: 96%;
  }
`

export const Chats = styled.div`
margin: 5%;
`
export const SendButton = styled.div`
display: flex;
width: 50%;
align-self: center;
padding-top: 2%;
padding-bottom: 2%;
justify-content: center;
@media screen and (max-width: 1200px) {
   width: 75%;
}
@media screen and (max-width: 600px) {
   width: 96%;
}
`
export const ChatInput = styled.div`
opacity: 0.8;
transition: 1s;
width: 75%;
:hover {
    opacity: 1;
  }
`
export const ChatButton = styled.div`
background-color: rgb(124, 42, 255);
opacity: 0.8;
color: #fff;
width: 25%;
text-shadow: none;
font-size: 20px;
margin: 3px;
padding: 5px;
:hover {
    background-color: rgb(124, 42, 255);
    opacity: 1;
    color: #fff;
    width: 26%;
  }
`
