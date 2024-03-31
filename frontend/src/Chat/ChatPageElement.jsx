import styled from 'styled-components';

export const ChatPageBackground = styled.div`
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