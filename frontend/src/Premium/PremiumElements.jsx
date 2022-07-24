import styled from "styled-components";

export const PremiumContainer = styled.div`
  background-color: #000;
  height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    height: 1200px;
  }

  @media screen and (max-width: 480px) {
    height: 1400px;
  }
 `;
export const PremiumWrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 26px;
    padding: 0 50px;

    @media screen and (max-width: 1000px) {
      grid-template-columns: 1fr 1fr;
  }

    @media screen and (max-width: 786px) {
      grid-template-columns: 1fr;
      padding: 0 20px;
  }
`;

export const PremiumCard1 = styled.div`
  background: linear-gradient(90deg, rgba(246,210,66,1) 0%, rgba(255,82,229,1) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 30px;
  max-height: 380px;
  padding:  34px;
  box-shadow: #F6D242 0px 4px 16px, #FF52E5 0px 8px 32px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
   
  }
`;
export const PremiumCard2 = styled.div`
  background: linear-gradient(90deg, rgba(250,178,255,1) 0%, rgba(24,0,255,1) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 30px;
  max-height: 380px;
  padding:  34px;
  box-shadow:#fab2ff 0px 4px 16px, #1800ff 0px 8px 32px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
   
  }
`;
export const PremiumCard3 = styled.div`
  background: linear-gradient(90deg, rgba(105,255,151,1) 0%, rgba(0,228,255,1) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 30px;
  max-height: 380px;
  padding:  34px;
  box-shadow: #69ff97 0px 4px 16px, #00e4ff 0px 8px 32px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
   
  }
`;
export const PremiumIcon = styled.img`
  height: 180px;
  width: 180px;
  margin-bottom: 18px;
  border-radius: 30px;
`;
export const PremiumH1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 34px;
  background: linear-gradient(to right, #ba00ff, #ff1d00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Berkshire Swash", cursive;
  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }  
`;
export const PremiumH2 = styled.h2`
  font-size: rem;
  margin-bottom: 10px;
  color: #000;
`;

export const TextBelow = styled.h1`
color: #fff;
margin-top: 20px;
font-size: 2.5rem;
font-family: "Berkshire Swash", cursive;
@media screen and (max-width: 480px) {
  font-size: 2rem;
}  
`