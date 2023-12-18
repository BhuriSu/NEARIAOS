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
export const Avatar = styled.div`
width: 140px;
height: 140px;
border-radius: 50%;
background-size: cover;
background-position: center;
cursor: pointer;
`;
export const InputAvatar = styled.input`
display: none;
`
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

// EditProfile.jsx

export const BackgroundEditContainer = styled.div`
  max-width: 32rem; 
  background-color: #fff; 
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0), 0 2px 4px -1px rgba(0, 0, 0); 
  margin-left: auto; 
  margin-right: auto; 
  padding: 1.75rem; 
  border-radius: 0.375rem; 
  margin-top: 1.5rem; 

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
export const BackgroundEditProfile = styled.div`
font-weight: 600; 
font-size: 1.5rem; 
margin-bottom: 1rem; 
display: block; 
text-align: center; 
`;
export const SubmitContainer = styled.div`
gap: 0.5rem;
`;
export const StyledLabel = styled.label`
  color: #6b7280; 
  margin-bottom: 0.5rem; 
  display: block; 
  font-weight: 600; 
`;
export const EditInput = styled.input`
  width: 100%; 
  display: block; 
  border: 1px solid #e2e8f0; 
  padding: 0.75rem; 
  color: #6b7280; 
  border-radius: 0.375rem; 
  outline: none; 
  transition: box-shadow 0.2s, border-color 0.2s; 

  &:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5); 
    border-color: #4299e1; 
  }

  &::placeholder {
    color: #a0aec0; 
  }
`;
export const EditButton = styled.button`
  width: 100%; 
  margin-top: 0.75rem; 
  background-color: #4299e1; 
  color: #fff; 
  border-radius: 0.125rem; 
  padding: 0.5rem 1rem;
  &:hover {
    background-color: #3182ce; 
  }
`;