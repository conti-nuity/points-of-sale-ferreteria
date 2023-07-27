import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  display: grid;
  grid-template-columns: 35% 17% 17% 15% 11%;
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
      margin: 0;
      font-family: "Poppins";
      font-size: 14px;
      color: #000;
    }
    & span {
      margin: 0;
      font-family: "Jost";
      font-size: 14px;
      color: ${({ stockAvailable }) => (stockAvailable ? "#4b88ee" : "grey")};
      cursor: ${({ stockAvailable }) =>
        stockAvailable ? "pointer" : "default"};
    }
  }
`;

const ContentInput = styled.div`
  position: relative;
  & button {
    margin: 0;
    font-family: "Jost";
    color: #4b88ee;
    font-size: 14px;
    cursor: pointer;
    border: none;
    background: none;
  }
  & span {
    top: 7px;
    position: absolute;
    left: 8.5px;
    font-family: "Poppins" !important;
    color: #1d1d1d !important;
  }
  & input {
    width: 100px;
    padding: 7px 0px 6px 16px;
    border-radius: 4px;
    border: 1px solid;
    color: #1d1d1d !important;
  }
  small {
    position: absolute;
    right: 14px;
    top: 8px;
    font-size: 13px;
    font-family: "Jost";
    color: #000;
    text-transform: capitalize;
  }
  @media screen and (max-width: 768px) {
    & input {
      width: 70px;
    }
  }
`;

export const ProductCard = ({ product, index, cart, setCart }) => {
  const [priceUnit, setPriceUnit] = useState(product.sell_price);
  const [quantityUnit, setQuantityUnit] = useState(1);
  const [changePrice, setChangePrice] = useState(false);

  useEffect(() => {
    setPriceUnit(product.sell_price);
  }, [product]);

  return (
    <Card stockAvailable={product.stock > 0 ? true : false}>
      <div>
        <p>{product.name}</p>
      </div>
      <div>
        {product.is_product_variable[0] === "1" ? (
          <ContentInput>
            {!changePrice && (
              <>
                <p>
                  ${product.sell_price}
                  <button onClick={() => setChangePrice(true)}>Editar</button>
                </p>
              </>
            )}
            {changePrice && (
              <>
                <span>$</span>
                <div>
                  <input
                    type="text"
                    placeholder=""
                    value={priceUnit}
                    onChange={(e) => setPriceUnit(e.target.value)}
                  />
                </div>
              </>
            )}
          </ContentInput>
        ) : (
          <p>${product.sell_price}</p>
        )}
      </div>
      <div>
        <ContentInput>
          <input
            type="number"
            placeholder=""
            onChange={(e) => setQuantityUnit(parseFloat(e.target.value))}
            value={quantityUnit}
          />
          <small>{product.unit_measure}</small>
        </ContentInput>
      </div>
      <div>
        <p>
          {product.stock > 0 ? (
            <>
              {product.stock} {product.unit_measure}
            </>
          ) : (
            <small>Sin inventario</small>
          )}
        </p>
      </div>
      <div>
        <span
          onClick={() =>
            product.stock > 0 &&
            setCart([
              ...cart,
              {
                ...product,
                index: index,
                totalPrice: priceUnit * quantityUnit,
                quantityAdded: quantityUnit,
              },
            ])
          }
        >
          + Agregar
        </span>
      </div>
    </Card>
  );
};
