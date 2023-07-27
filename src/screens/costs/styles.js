import styled from "styled-components";

export const InventoryWrapper = styled.div`
  margin-top: 60px;
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
`;

export const Title = styled.h1`
  color: #000;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 37px;
`;

export const Description = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #000;
`;

export const ButtonAddInventory = styled.button`
  margin: 0;
  font-family: "Jost";
  color: #4b88ee;
  font-size: 14px;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

export const Content = styled.div`
  margin-top: 60px;
`;

export const HeaderInfo = styled.div`
  display: grid;
  grid-template-columns: 25% 35% 20% 20%;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  align-items: flex-end;
  justify-items: flex-start;
  padding: 10px 10px 10px 30px;
  & div p {
    font-family: "Poppins";
    font-size: 12px;
    line-height: 120%;
    color: #727f88;
    padding: 0 27px 0 0;
    margin-bottom: 5px;
  }
`;

export const Card = styled.div`
  display: grid;
  grid-template-columns: 25% 35% 20% 20%;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-items: center;
  justify-items: flex-start;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 15px 10px 15px 30px;
  & div {
    & img {
      width: 44px;
      height: 44px;
    }
    & p {
      text-transform: capitalize;
      margin: 0;
      font-family: "Poppins";
      font-size: 14px;
      color: #000;
    }
    & span {
      margin: 0;
      font-family: "Jost";
      color: #4b88ee;
      font-size: 14px;
      cursor: pointer;
    }
  }
`;

export const ContentDateRange = styled.div`
  text-align: center;
  & h2 {
    margin-bottom: 60px;
  }
`;

export const ButtonAddDateRange = styled.button`
  width: 200px;
  margin: 60px 0 0px;
  font-family: "Jost";
  color: #fff;
  background: #4b88ee;
  font-size: 14px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
`;

export const ButtonAdd = styled.button`
  margin: 10px 0;
  font-family: "Jost";
  color: #4b88ee;
  font-size: 14px;
  cursor: pointer;
  border: none;
  padding: 0;
  background-color: transparent;
`;
