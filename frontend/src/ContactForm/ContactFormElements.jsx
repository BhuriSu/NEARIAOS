import styled from 'styled-components';

export const StyledFormWrapper = styled.div`
  background-color: #000;
  height: 1000px;
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
export const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #000;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: #00ff9d 0px 50px 100px -20px, #00ff9d 0px 30px 60px -30px;
`;

export const TopicForm = styled.h1`
  margin-top: 24px;
  color: #fff;
  font-size: 28px;
  text-align: center;
  max-width: 600px;

  @media screen and (max-width: 768px) {
    font-size: 24px
  }
  @media screen and (max-width: 480px) {
    font-size: 18px
  }
`;


export const StyledError = styled.div`
  color:#ff0000;
  font-weight: 800;
  margin: 0 0 40px 0;
`;

export const StyledButton = styled.button`
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

export const StyledTextArea = styled.textarea`
  background-color: #00ffa6;
  width: 100%;
  min-height: 100px;
  resize: none;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
  ::placeholder { 
    color: #000;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  background-color: #00ffa6;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0 20px 0;
  padding: 20px;
  border-color:#000 ;
  box-sizing: border-box;
  ::placeholder { 
    color: #000;
  }
`;

