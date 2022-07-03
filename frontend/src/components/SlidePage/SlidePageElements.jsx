import styled from 'styled-components';

export const FullWidth = styled.div`
  background: #000;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  @media screen and  (max-width: 768px) {
    padding: 140px 0;
  }
  
`;

export const Photo = styled.img`
  width: ${(props) => props.scale * 300}px;
  height: ${(props) => props.scale * 300}px;
  border-radius: 30px;
  object-fit: cover;
  object-position: top;
  margin-left: ${(props) => (props.offset === 'true' ? props.scale * 7 : props.scale * 87)}px;
  margin-right: ${(props) => (props.offset === 'true' ? props.scale * 80 : 0)}px;
`;
