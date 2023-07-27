import React, { useState } from "react";
import styled from "styled-components";
import { separator } from "../../utils/funcitons";

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #d1d1d1;
`;

const ProductName = styled.h4`
  font-weight: 500;
  font-size: 16px;
`;

const Amount = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  & label {
    color: #000;
    font-weight: 400;
    font-size: 12px;
    margin-right: 7px;
  }
  & input {
    /* width: 30px;
    height: 15px; */
    width: 50px;
    padding: 4px 0px 4px 0px;
    border-radius: 4px;
    border: 1px solid;
    color: #1d1d1d !important;
    text-align: center;
    margin-right: 5px;
  }
`;

const ProductPrice = styled.p`
  font-weight: 400;
  font-size: 14px;
`;

const ButtonRemoveProduct = styled.button`
  margin-top: 10px;
  border: none;
  background: transparent;
  color: #e81515;
  cursor: pointer;
  padding: 0px;
`;

const QuantityController = styled.div`
  display: flex;
  align-items: center;
  & p {
    margin: 0 10px;
    font-weight: 400;
  }
  & button {
    background-color: #dddddd;
    border: none;
    border-radius: 50px;
    padding: 2px 8px;
    cursor: pointer;
    &:first-child {
      margin-right: 5px;
    }
    &:last-child {
      margin-left: 5px;
    }
  }
`;

const TotalPrice = styled.small`
  font-family: "Jost";
  font-size: 12px;
  color: #727f88;
`;

export const ProductCart = ({ index, product, cart, setCart }) => {
  const [quantityAdded, setQuantityAdded] = useState(product.quantityAdded);

  const uploadQuantityAdded = (method, index) => {
    if (method === "minus") {
      if (quantityAdded <= 1) {
        setQuantityAdded(1);
      } else {
        const newQuantity = quantityAdded - 1;
        const totalPrice = newQuantity * product.sell_price;
        setQuantityAdded(newQuantity);
        cart[index] = {
          ...product,
          quantityAdded: newQuantity,
          totalPrice,
        };
        setCart([...cart]);
      }
    }
    if (method === "plus") {
      if (quantityAdded === product.stock) {
        return false;
      } else {
        const newQuantity = quantityAdded + 1;
        const totalPrice = newQuantity * product.sell_price;
        setQuantityAdded(newQuantity);
        cart[index] = {
          ...product,
          quantityAdded: newQuantity,
          totalPrice,
        };
        setCart([...cart]);
      }
    }
  };

  const uploadQuantityAdded2 = (e) => {
    const newQuantity = e.target.value;
    const totalPrice = newQuantity * product.sell_price;
    setQuantityAdded(newQuantity);
    cart[index] = {
      ...product,
      quantityAdded: newQuantity,
      totalPrice,
    };
    setCart([...cart]);
  };

  const subtotal = product.is_product_variable
    ? parseFloat(product.quantityAdded)
    : product.quantityAdded;

  const deleteItem = () => {
    cart.splice(index, 1);
    setCart([...cart]);
  };

  return (
    <Card>
      <div>
        <ProductName>{product.name}</ProductName>
        {product.is_product_variable ? (
          <Amount>
            <label>Cantidad:</label>
            <input
              value={product.quantityAdded}
              onChange={(e) => uploadQuantityAdded2(e)}
            />
            <label>{product.unit_measure} </label>
          </Amount>
        ) : (
          <Amount>
            <label>Cantidad:</label>
            <QuantityController>
              <button onClick={() => uploadQuantityAdded("minus", index)}>
                -
              </button>
              <p>{quantityAdded}</p>
              <button onClick={() => uploadQuantityAdded("plus", index)}>
                +
              </button>
            </QuantityController>
          </Amount>
        )}
        <ButtonRemoveProduct onClick={deleteItem}>Eliminar</ButtonRemoveProduct>
      </div>
      <div>
        <ProductPrice>Precio: ${product.sell_price}</ProductPrice>
        <TotalPrice>
          Subtotal: ${separator((product.sell_price * subtotal).toFixed(2))}
        </TotalPrice>
      </div>
    </Card>
  );
};
