import React, { useState } from "react";
import styled from "styled-components";
import { getRandomArbitrary } from "../utils/funcitons";
import { useSalesStore } from "../store";
import { addSale } from "../api/sales";
import { updateStock } from "../api/stock";

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
  // Store
  const sales = useSalesStore((state) => state.sales);
  const setSales = useSalesStore((state) => state.setSales);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const cleanCart = () => {
    setCart([]);
    setEntry(0);
    setTotal(0);
  };

  const finalizeSale = (withTicket) => {
    withTicket ? setLoading2(true) : setLoading1(true);

    const date = new window.Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const saleId = `${day}${month}${year}`;

    let uuid = getRandomArbitrary(2, 3000000);

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

    // Sale Information
    const sale = {
      uuid,
      created_at: new window.Date(),
      products: [...products],
      info: {
        totalPriceSell: totalSell,
        totalDealer: totalDealer,
        entryOfSale: parseInt(entry).toFixed(2),
        changeOfSale: changeOfSale,
      },
    };

    // Add new sale
    addSale(saleId, [sale, ...sales])
      .then(() => {
        // Change sales stock
        setSales([{ ...sale }, ...sales]);
        cart.map((product) => {
          // Change Stock
          if (product.index >= 0) {
            updateStock(product)
              .then(() => {
                cleanCart();
                withTicket ? setLoading2(false) : setLoading1(false);
                setShowModal(false);
                withTicket && window.open(`/print-ticket/${uuid}`, "_blank");
              })
              .catch(() => {
                withTicket ? setLoading2(false) : setLoading1(false);
              });
          } else {
            console.log("Run clean");
            cleanCart();
            setShowModal(false);
            withTicket ? setLoading2(false) : setLoading1(false);
            withTicket && window.open(`/print-ticket/${uuid}`, "_blank");
          }
        });
      })
      .catch(() => {
        withTicket ? setLoading2(false) : setLoading1(false);
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
