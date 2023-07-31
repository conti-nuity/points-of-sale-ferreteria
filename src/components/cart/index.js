import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IconBag from "../../assets/icons/shopping-bag.svg";
import { ProductCart } from "./ProductCart";
import { Modal } from "../../components/Modal";
import { ConfirmationSell } from "../../components/ConfirmationSell";
import { separator } from "../../utils/funcitons";
import { AddExpressProduct } from "../../components/AddExpressProduct";

const CarContent = styled.div`
  position: relative;
  background-color: #fff;
  height: 100vh;
  padding: 50px 25px 20px;
  & h2 {
    font-weight: 500;
  }
`;

const FooterCart = styled.div`
  position: absolute;
  width: 87%;
  bottom: 25px;
  & button {
    margin-top: 20px;
    background-color: ${({ enableButton }) =>
      enableButton ? "#4b88ee" : "#b1b1b1"};
    color: #fff;
    border: none;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    pointer-events: ${({ enableButton }) =>
      enableButton ? "initial" : "none"};
  }
`;

const TotalContent = styled.div`
  display: grid;
  grid-template-columns: 47% 47%;
  grid-template-rows: 1fr;
  grid-column-gap: 14px;
  grid-row-gap: 0px;
  & div p {
    font-weight: 400;
    font-size: 20px;
  }
  @media screen and (max-width: 1024px) {
    display: block;
  }
`;

const Field = styled.div`
  & label {
    display: block;
    font-weight: 500;
    font-size: 14px;
  }
  & input {
    width: 100%;
    padding: 10px 10px 10px 10px;
    margin-top: 10px;
    background: transparent;
    border: 1px solid;
    border-radius: 4px;
  }
  @media screen and (max-width: 1024px) {
    margin-bottom: 10px;
    & input {
      margin-top: 0px;
      width: 100%;
    }
  }
`;

const Total = styled.p`
  margin-top: 20px;
  font-weight: 400;
  text-align: right;
`;

const ProductList = styled.div`
  max-height: calc(100vh - 340px);
  overflow-y: scroll;
  overflow-x: hidden;
`;

const NoProducts = styled.p`
  margin-top: 10px;
  font-size: 13px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & img {
    vertical-align: text-bottom;
    margin-right: 4px;
  }
  & h2 {
    display: inline-flex;
  }
  & div button {
    margin: 0;
    font-family: "Jost";
    color: #4b88ee;
    font-size: 14px;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
`;

export const Cart = ({ cart, setCart }) => {
  const [isShowModal, setShowModal] = useState(false);
  const [isShowModalAddProduct, setShowModalAddProduct] = useState(false);

  const [entry, setEntry] = useState();
  const [enableButton, setEnableButton] = useState(false);

  const handleChange = (e) => {
    if (cart.length > 0) {
      if (e.target.value.length) {
        setEntry(e.target.value);
        setEnableButton(true);
      } else {
        setEntry();
        setEnableButton(false);
      }
    }
  };

  const [total, setTotal] = useState(0);
  const [totalDealer, setTotalDealer] = useState(0);

  useEffect(() => {
    if (cart.length > 0) {
      const totalPriceOfAllProducts = cart.map((product) => product.totalPrice);
      const initialValue = 0;
      const sumWithInitial = totalPriceOfAllProducts.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );

      setTotal(sumWithInitial);

      const totalPriceOfAllProductsDealer = cart.map(
        (product) =>
          parseFloat(product.dealer_price) * parseFloat(product.quantityAdded)
      );
      const initialValueDealer = 0;
      const sumWithInitialDealer = totalPriceOfAllProductsDealer.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValueDealer
      );

      setTotalDealer(sumWithInitialDealer);
    }
  }, [cart]);

  return (
    <CarContent>
      <Header>
        <div>
          <img src={IconBag} alt="canasta" />
          <h2>Canasta</h2>
        </div>
        <div>
          <button onClick={() => setShowModalAddProduct(true)}>
            + Producto Express
          </button>
        </div>
      </Header>
      <div>
        {cart.length ? (
          <>
            <ProductList>
              {cart.map((product, i) => (
                <ProductCart
                  index={i}
                  key={i}
                  product={product}
                  cart={cart}
                  setCart={setCart}
                />
              ))}
            </ProductList>
            <Total>Total: ${separator(total.toFixed(2))} MXN</Total>
          </>
        ) : (
          <NoProducts>No hay prductos agregados en la canasta</NoProducts>
        )}
      </div>
      <FooterCart enableButton={enableButton}>
        <TotalContent>
          <div>
            <Field>
              <label>$ Monto ingresado</label>
              <input
                readOnly={cart.length > 0 ? false : true}
                name="entry"
                value={entry}
                onChange={(e) => handleChange(e)}
                type="number"
              />
            </Field>
          </div>
          <div>
            <Field>
              <label>$ Cambio</label>
              <input
                type="number"
                value={entry > 0 && (entry - total).toFixed(2)}
              />
            </Field>
          </div>
        </TotalContent>
        <button onClick={() => setShowModal(true)}>Finalizar venta</button>
      </FooterCart>
      <Modal
        size="medium"
        isShowModal={isShowModalAddProduct}
        methodClose={setShowModalAddProduct}
        hideHeader={true}
        hideScroll={true}
      >
        <AddExpressProduct
          cart={cart}
          setCart={setCart}
          setShowModal={setShowModalAddProduct}
        />
      </Modal>
      <Modal
        size="medium"
        isShowModal={isShowModal}
        methodClose={setShowModal}
        hideHeader={true}
        hideScroll={true}
      >
        <ConfirmationSell
          totalSell={total}
          totalDealer={totalDealer}
          setShowModal={setShowModal}
          setCart={setCart}
          cart={cart}
          entry={entry}
          setEntry={setEntry}
          setTotal={setTotal}
          changeOfSale={(entry - total).toFixed(2)}
        />
      </Modal>
    </CarContent>
  );
};
