import styled from 'styled-components';

export const NavbarNewFeedContainer = styled.div`
padding: 1rem 0.5rem;
.ant-row-space-between {
  align-items: center;
  text-align: center;
}
`;
export const NavList = styled.div`
display: flex;
justify-content: space-between;
height: 80px;
z-index: 1;
width: 100%;
padding: 0 24px;
max-width: 1100px;
`;
export const ListLi = styled.div`
list-style: none;
transition: 1s;
margin-left: 0%;
:hover {
    transform: scale(1.3);
  }
`;
