import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const Button = styled(LinkR)`
  border-radius: 50px;
  background: ${({ primary }) => (primary ? '#05fff3' : '#05fff3')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '14px  48px' : '12px 30px')};
  color: ${({ dark }) => (dark ? '#000' : '#000')};
  font-size:${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? '#8c2eff' : '#8c2eff')};

  }
`;
