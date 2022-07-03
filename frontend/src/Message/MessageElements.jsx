import styled from 'styled-components';

export const MessageBody = styled.div`
font-family: helvetica;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 8px;
justify-content: center;
`;
export const MessageChat = styled.div`
width: 100%;
display: flex;
flex-direction: column;
padding: 10px;
`;
export const MessageText = styled.div`
margin: 2px;
width: 40%;
border-radius: 20px;
padding: 8px 15px;
display: inline-flex;
flex-wrap: wrap;
word-break: break-all;
`;
export const MineMessage = styled.div`
color: #fff;
font-size: 25px;
margin-left: 25%;
background: linear-gradient(to bottom, #e01b3c, #e25e74 100%);

background-attachment: fixed;
position: relative;
`;
