import styled from 'styled-components';
export const CreateAccountContainer = styled.div`
background: #000;
height: 800px;
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
export const FirstLineCreateAccount = styled.h1`
  color: #fff;
  font-size: 24px;
  text-align: center;
`;
export const FormAccount = styled.form`
display: flex;
margin-right:160px;
text-align: center;
`;
export const FormSection = styled.div`
display: flex;
flex-direction: column;
padding: 20px;
width: 35%;
text-align: start;
`;
export const LabelAccount = styled.div`
margin: 10px 0;
`;
export const InputAccount = styled.input`
padding: 10px;
border: solid 2px #6f00ff;
border-radius: 10px;
margin-right: -250px;
`;
export const ContainerDob = styled.div`
background-color: #fff;
padding: 10px;
border: solid 2px #6f00ff;
border-radius: 10px;
margin-right: -250px;
`;
export const InputAccountSubmit = styled.input`
background-color: #6f00ff;
padding: 10px;
border: solid 2px #000;
border-radius: 10px;
transition: all 0.3s;
margin-top: 20px;
margin-right: -250px;
&:hover {
    transition: all 0.2s ease-in-out;
    background: #5cff6f;
    color: #000;
  }
`;
