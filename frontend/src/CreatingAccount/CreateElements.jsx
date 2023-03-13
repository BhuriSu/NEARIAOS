import styled from 'styled-components';
export const CreatingContainer = styled.div`
background-color: #81d1fc;
height: 700px;
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
  color: #000;
  font-size: 24px;
  text-align: center;
`;
export const FormAccount = styled.form`
display: flex;
justify-content: center;
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
border: solid 2px #000;
border-radius: 10px;
transition: all 0.3s;
margin-right: 10px;
`;
export const InputAccountSubmit = styled.input`
background-color: #7033ff;
padding: 10px;
border: solid 2px #000;
border-radius: 10px;
transition: all 0.3s;
margin-top: 20px;
margin-right: 10px;
&:hover {
    transition: all 0.2s ease-in-out;
    background: #5cff6f;
    color: #000;
  }
`;
export const MultipleContainer = styled.div`
display: flex;
flex-direction: row;
`;
export const MultipleInputAccount = styled.input`
padding: 10px;
border: solid 2px #000;
border-radius: 10px;
margin-right: 10px;
`;
export const MultipleLabelAccount = styled.div`
margin: 10px 0;
`;
export const PhotoContainer = styled.div`
margin-top: 50px;
margin-left: 180px;
width: 100%
`;
export const LabelAccountPhoto = styled.div`
margin: 10px 280px 0;
`;