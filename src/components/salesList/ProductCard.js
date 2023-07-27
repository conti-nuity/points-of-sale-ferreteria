import React from "react";
import styled from "styled-components";

const Card = styled.div`
  display: grid;
  grid-template-columns: 35% 17% 17% 15% 11%;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-items: center;
  justify-items: flex-start;
  background-color: #f5f5f5;
  margin-bottom: 20px;
  padding: 5px 0px 5px 20px;
  & div {
    & img {
      width: 44px;
      height: 44px;
    }
    & p {
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

export const ProductCard = ({ product }) => {
  return (
    <Card>
      <div>
        <p>{product.name}</p>
      </div>
      <div>
        <p>
          {product.purchased_amount} {product.unit_measure}
        </p>
      </div>
      <div>
        <p>${product.sell_price}</p>
      </div>
      <div>
        <p>${product.total_price}</p>
      </div>
    </Card>
  );
};
