import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
`;

// margin: 10px;
// height: 97vh;
// border-right: 1px solid #bdcdd696;

export const Content = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  & li:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const ItemNavegation = styled.li`
  display: block;
  & span {
    background: ${({ active }) => (active ? "#4b88ee66" : "transparent")};
    display: inline-flex;
    align-items: center;
    padding: 8px 15px;
    border-radius: 50px;
    cursor: pointer;
    & p {
      font-size: 13px;
      margin-left: 5px;
    }
  }
`;
