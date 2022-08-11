import styled from "styled-components";

export const MsgButton = styled.div`
width: 50%;
borderRight: none;
borderLeft: none;
alignSelf: center;
padding: 10px;
color:  #fff;
margin: 5px;
:hover {
    opacity: 0.4;
    transition: 1s;
  }
`;
export const Avatar = styled.div`
width: 250px;
height: 250px;
border-radius: 50%;
background-repeat: no-repeat;
background-size: cover;
background-position: center;
cursor: pointer;
`;
export const MainChat = styled.div`
background-color: #000;
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

export const ButtonChatDiv = styled.div`
display: "flex";
justifyContent: "center";
flexDirection: "column";
width:800px;
height:800px;
`