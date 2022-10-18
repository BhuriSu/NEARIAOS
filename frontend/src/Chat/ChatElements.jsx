import styled from "styled-components";

//Sidebar.jsx
export const SidebarChat = styled.div`
flex: 1;
background-color: #3e3c61;
position: relative;
`;

//Search.jsx
export const SearchContainer = styled.div`
border-bottom: 1px solid gray;
`;
export const SearchForm = styled.div`
padding: 10px;
input {
    background-color: transparent;
    border: none;
    color: white;
    outline: none;

    &::placeholder {
      color: lightgray;
    }
`;
export const UserChat = styled.div`
padding: 10px;
display: flex;
align-items: center;
gap: 10px;
color: white;
cursor: pointer;

&:hover {
  background-color: #2f2d52;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
`;
export const UserChatInfo = styled.div`
span {
    font-size: 18px;
    font-weight: 500;
  }
  p {
    font-size: 14px;
    color: lightgray;
  }
`;

//Navbar.jsx
export const NavbarChat = styled.div`
display: flex;
align-items: center;
background-color: #2f2d52;
height: 50px;
padding: 10px;
justify-content: space-between;
color: #ddddf7;
`;
export const LogoChat = styled.div`
font-weight: bold;
@include tablet {
  display: none;
}
`;
export const User = styled.div`
display: flex;
gap: 10px;

img {
  background-color: #ddddf7;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  object-fit: cover;
}
`;


//Messages.jsx
export const MessagesContainer = styled.div`
background-color: #ddddf7;
padding: 10px;
height: calc(100% - 160px);
overflow: scroll;
`;

//Message.jsx
export const MessageContainer = styled.div`
display: flex;
gap: 20px;
margin-bottom: 20px;
{props=>props.owner && 
  flex-direction: row-reverse;
  .messageContent {
    align-items: flex-end;
    p {
      background-color: #8da4f1;
      color: white;
      border-radius: 10px 0px 10px 10px;
    }
  }
}
`;
export const MessageInfo = styled.div`
display: flex;
flex-direction: column;
color: gray;
font-weight: 300;

img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
`;
export const MessageContent = styled.div`
max-width: 80%;
display: flex;
flex-direction: column;
gap: 10px;
p {
  background-color: white;
  padding: 10px 20px;
  border-radius: 0px 10px 10px 10px;
  max-width: max-content;
}

img {
  width: 50%;
}
`;

//Input.jsx
export const InputChatContainer = styled.div`
height: 50px;
background-color: white;
padding: 10px;
display: flex;
align-items: center;
justify-content: space-between;

input {
  width: 100%;
  border: none;
  outline: none;
  color: #2f2d52;
  font-size: 18px;

  &::placeholder {
    color: lightgray;
  }
`;
export const SendContainer = styled.div`
display: flex;
align-items: center;
gap: 10px;

img {
  height: 24px;
  cursor: pointer;
}

button {
  border: none;
  padding: 10px 15px;
  color: white;
  background-color: #8da4f1;
  cursor: pointer;
}
`;

//Index.jsx
export const ChatContainer = styled.div`
flex: 2;
`;
export const ChatInfo = styled.div`
height: 50px;
background-color: #5d5b8d;
display: flex;
align-items: center;
justify-content: space-between;
padding: 10px;
color: lightgray;
`;
export const BackToListPage = styled.p`
  color: #fff;
  font-size: 24px;
  text-align: center;
`;