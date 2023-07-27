import React from "react";
import styled from "styled-components";
import { SalesCard } from "./SalesCard";

const Content = styled.div`
  margin-top: 40px;
`;

const ListOfCard = styled.div`
  margin-top: 20px;
`;

const Title = styled.h4`
  color: #000;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 18px;
`;

const HeaderField = styled.div`
  display: flex;
  justify-content: space-between;
  & p {
    font-size: 13px;
  }
`;

export const SalesList = ({ salesToday, setSalesToday }) => {
  return (
    <Content>
      {salesToday.length ? (
        <div>
          <HeaderField>
            <div>
              <Title>Ventas</Title>
            </div>
            <div>
              <p>
                Total: {salesToday.length}{" "}
                {salesToday.length === 1 ? "Venta" : "Ventas"}
              </p>
            </div>
          </HeaderField>
          <ListOfCard>
            {salesToday.map((item) => (
              <SalesCard
                {...item}
                salesToday={salesToday}
                setSalesToday={setSalesToday}
              />
            ))}
          </ListOfCard>
        </div>
      ) : (
        <p>No hay ventas</p>
      )}
    </Content>
  );
};
