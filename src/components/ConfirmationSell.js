import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { getRandomArbitrary } from "../utils/funcitons";

const ContentModalConfirmationSell = styled.div`
  & h1 {
    font-weight: 400;
    text-align: center;
    border-bottom: 1px solid #d5d5d5;
    margin-bottom: 15px;
    padding-bottom: 10px;
    font-size: 45px;
  }
  & h2 {
    font-weight: 500;
    text-align: center;
    font-size: 17px;
  }
  & p {
    margin-top: 5px;
    font-size: 13px;
    font-weight: 400;
    text-align: center;
    color: #2d4665;
  }
  & div {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    & div button {
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 4px;
    }
    & div:first-child button {
      background-color: transparent;
      border: 1px solid #cecece;
      margin-right: 20px;
    }
    & div:last-child button {
      border: none;
      color: #fff;
      background-color: #4b88ee;
    }
  }
`;

export const ConfirmationSell = ({
  totalSell,
  totalDealer,
  setCart,
  cart,
  setEntry,
  setTotal,
  entry,
  changeOfSale,
  setShowModal,
}) => {
  const [status, setStatus] = useState();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const finalizeSale = (withTicket) => {
    withTicket ? setLoading2(true) : setLoading1(true);
    const uuid = getRandomArbitrary(2, 3000000);

    const products = cart.map((cart) => {
      return {
        uuid: cart.uuid,
        name: cart.name,
        purchased_amount: cart.quantityAdded,
        unit_measure: cart.unit_measure,
        sell_price: cart.sell_price,
        total_price: cart.totalPrice,
        dealer_price: parseFloat(cart.dealer_price),
      };
    });

    console.log("run", {
      uuid,
      created_at: new window.Date(),
      products: [...products],
      info: {
        totalPriceSell: totalSell,
        totalDealer: totalDealer,
        entryOfSale: parseInt(entry).toFixed(2),
        changeOfSale: changeOfSale,
      },
    });
    db.collection("sales")
      .doc(uuid)
      .set({
        uuid,
        created_at: new window.Date(),
        products: [...products],
        info: {
          totalPriceSell: totalSell,
          totalDealer: totalDealer,
          entryOfSale: parseInt(entry).toFixed(2),
          changeOfSale: changeOfSale,
        },
      })
      .then((response) => {
        cart.map((product) => {
          if (product.index >= 0) {
            db.collection("stock")
              .doc(`${product.uuid}`)
              .update({
                stock: product.stock - product.quantityAdded,
              })
              .then((res) => {
                setCart([]);
                setEntry(0);
                setTotal(0);
                withTicket ? setLoading2(false) : setLoading1(false);
                setShowModal(false);
                withTicket && window.open(`/print-ticket/${uuid}`, "_blank");
              })
              .catch((error) => {
                withTicket ? setLoading2(false) : setLoading1(false);
                setStatus(
                  "Ocurrio un error al cambiar el inventario, intenta ponerte en contacto con el desarrollador"
                );
                console.log(
                  error,
                  "Ocurrio un error al cambiar el inventario, intenta ponerte en contacto con el desarrollador"
                );
              });
          } else {
            setCart([]);
            setEntry(0);
            setTotal(0);
            withTicket ? setLoading2(false) : setLoading1(false);
            setShowModal(false);
            withTicket && window.open(`/print-ticket/${uuid}`, "_blank");
          }
        });
      })
      .catch((error) => {
        withTicket ? setLoading2(false) : setLoading1(false);
        setStatus(
          "Ocurrio un error al proceder con la venta, intenta ponerte en contacto con el desarrollador"
        );
        console.log(
          error,
          "Ocurrio un error al proceder con la venta, intenta ponerte en contacto con el desarrollador"
        );
      });
  };

  return (
    <div>
      <ContentModalConfirmationSell>
        <h1>${totalSell} MXN</h1>
        <h2>¿Confirmar venta?</h2>
        <p>Se generera un ticket con los detalles de la compra</p>
        <div>
          <div>
            <button onClick={() => finalizeSale(false)}>
              {loading1 ? "Cargando..." : "Confirmar sin ticket"}
            </button>
          </div>
          <div>
            <button onClick={() => finalizeSale(true)}>
              {loading2 ? "Cargando..." : "Confirmar con ticket"}
            </button>
          </div>
        </div>
      </ContentModalConfirmationSell>
    </div>
  );
};
