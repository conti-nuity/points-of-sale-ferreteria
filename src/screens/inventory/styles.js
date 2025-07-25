import styled from "styled-components";

export const InventoryWrapper = styled.div`
  margin-top: 30px;
  padding: 0px 30px 0px 0;
  @media screen and (max-width: 768px) {
    margin: 20px 0;
    padding: 0 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & button {
    margin: 10px 0;
    font-family: "Jost";
    color: #4b88ee;
    font-size: 14px;
    cursor: pointer;
    border: none;
    padding: 0;
    background-color: transparent;
  }
`;

export const Title = styled.h1`
  color: #000;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 28px;
`;

export const Description = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #000;
  text-transform: capitalize;
`;
