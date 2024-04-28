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
export const StyledInput = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #00ffa6;
  height: 10px;
  border-radius: 20px;
  margin: auto 0;
  padding: 20px 40px;
  border-color:#000 ;
  box-sizing: border-box;
  ::placeholder { 
    color: #000;
  }
`;
export const DivImage = styled.div`
height: 150px;
`;
export const SaveBtnStyle = styled.button`
  border-radius: 50px;
  background: #05fff3;
  white-space: nowrap;
  padding: 10px 22px;
  color: #000;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #8c2eff;
    color: #fff;
  }
`;
