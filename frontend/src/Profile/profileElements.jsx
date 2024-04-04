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
export const InputAvatar = styled.input`
display: none;
`
export const Avatar = styled.div`
width: 140px;
height: 140px;
border-radius: 50%;
background-size: cover;
background-position: center;
cursor: pointer;
`;

export const DateContainer = styled.div`
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
export const SaveBtnStyle = styled.button`
display: block;
background-color: #00ffa2;
color: #000;
font-size: 0.9rem;
border: 0;
border-radius: 20px;
height: 40px;
padding: 0 20px;
cursor: pointer;
box-sizing: border-box;
`;
export const DivImage = styled.div`
height: 80px;
`;