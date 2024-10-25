import styled from 'styled-components';

export const BackgroundProfileContainer = styled.div`
background-color: #000;
height: 1000px;
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
export const StyledInput = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #9645ff;
  height: 10px;
  border-radius: 20px;
  margin: auto 0;
  padding: 20px 40px;
  border-color:#000 ;
  box-sizing: border-box;
  ::placeholder { 
    color: #fff;
  }
`;
export const DateContainer = styled.div`
background-color: #9645ff;
border-radius: 20px;
padding: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 10px;
`;
export const DivImage = styled.div`
height: 150px;
`;
export const SaveBtnStyle = styled.button`
  border-radius: 50px;
  background: #9645ff;
  white-space: nowrap;
  padding: 10px 22px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #ff45f9;
    color: #fff;
  }
`;
export const BackToListPage = styled.p`
  color: #fff;
  font-size: 24px;
  text-align: center;
`;
export const LogOutLine = styled.p`
  color: #fff;
  font-size: 24px;
  text-align: center;
`;

export const DeleteBtnStyle = styled.button`
border-radius: 50px;
background: #ff0000;
white-space: nowrap;
padding: 10px 22px;
color: #fff;
font-size: 16px;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
`;