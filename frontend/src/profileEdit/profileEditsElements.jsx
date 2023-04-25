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
  padding: 20px;
  border-color:#000 ;
  box-sizing: border-box;
  ::placeholder { 
    color: #000;
  }
`;
export const Avatar = styled.div`
width: 200px;
height: 200px;
border-radius: 50%;
background-size: cover;
background-position: center;
cursor: pointer;
`;
export const InputAvatar = styled.input`
display: none;
`;
export const BelowDelete = styled.h2`
  font-size: 1rem;
  margin: 10px;
  color: #ff0000;
`;
export const DobContainer = styled.div`
background-color: #00ffa6;
border-radius: 20px;
padding: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 10px;
`;
export const FormEditProfile = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;