import styled from 'styled-components';

export const ServicesContainer = styled.div`
  height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000;

  @media screen and (max-width: 768px) {
    height: 1100px;
  }
  @media screen and (max-width: 480px) {
    height: 1300px;
  }
 
 `;
export const ServicesWrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 36px;
    padding: 0 50px;

    @media screen and (max-width: 1000px) {
      grid-template-columns: 1fr 1fr;
  }

    @media screen and (max-width: 786px) {
      grid-template-columns: 1fr;
      padding: 0 20px;
  }
`;
export const ServicesCard1 = styled.div`
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 30px;
  max-height: 380px;
  padding:  20px;
  box-shadow: #9900ff 0px 54px 55px, #9900ff 0px -12px 30px, #9900ff 0px 4px 6px,
  #9900ff 0px 12px 13px, #9900ff 0px -3px 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
   
  }
`;
export const ServicesCard2 = styled.div`
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 30px;
  max-height: 400px;
  padding:  20px;
  box-shadow: #fff838 0px 54px 55px, #fff838 0px -12px 30px, #fff838 0px 4px 6px,
  #fff838 0px 12px 13px, #fff838 0px -3px 5px;
  0px -12px 30px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
   
  }
`;
export const ServicesCard3 = styled.div`
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 30px;
  max-height: 380px;
  padding:  20px;
  box-shadow: #ff33c5 0px 54px 55px, #ff33c5 0px -12px 30px, #ff33c5 0px 4px 6px, 
  #ff33c5 0px 12px 13px, #ff33c5 0px -3px 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
   
  }
`;
export const ServicesIcon = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 10px;
`;
export const ServicesH1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 32px;
  background: linear-gradient(to right, #021aff, #e500ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }  
`;
export const ServicesH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
  color: #fff;
`;

export const ServicesP = styled.p`
  font-size: 1rem;
  text-align: center;
   color: #fff;
`;
