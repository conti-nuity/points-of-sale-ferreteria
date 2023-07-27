import React from "react";
import moment from "moment";
import styled from "styled-components";
import { separator } from "../utils/funcitons";

const Content = styled.div`
  margin-top: 60px;
`;

const HeaderInfo = styled.div`
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

const Title = styled.h4`
  color: #000;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const CostsList = ({ costs }) => {
  return (
    <div>
      <Content>
        <div>
          <Title>Gastos</Title>
        </div>
        <HeaderInfo>
          <div>
            <p>Nombre</p>
          </div>
          <div>
            <p>Descripción</p>
          </div>
          <div>
            <p>Precio</p>
          </div>
          <div>
            <p>Fecha</p>
          </div>
        </HeaderInfo>
        {costs?.map(({ name, description, price, created_at }) => (
          <Card>
            <div>
              <p>{name}</p>
            </div>
            <div>
              <p>{description}</p>
            </div>
            <div>
              <p>${separator(price)}</p>
            </div>
            <div>
              <p>
                {moment(
                  new window.Date(created_at.seconds * 1000).toJSON()
                ).format("LL")}
              </p>
            </div>
          </Card>
        ))}
      </Content>
    </div>
  );
};
