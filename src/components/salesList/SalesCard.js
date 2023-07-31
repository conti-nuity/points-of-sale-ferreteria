import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { separator } from "../../utils/funcitons";
import { ProductCard } from "./ProductCard";
import { deleteSale, updateStock } from "../../api/actions";
import { Toaster, toast } from "sonner";

const Card = styled.div`
  margin-bottom: 15px;
  background-color: #fff;
  padding: 15px 25px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  &:hover {
    transform: translateY(-1px);
    box-shadow: rgb(0 0 0 / 10%) 0px 2px 4px, rgb(0 0 0 / 6%) 0px 0px 2px;
  }
`;

const HeaderCard = styled.div`
  display: flex;
  justify-content: space-between;
  & button {
    border: none;
    background-color: transparent;
    color: #4b88ee;
    font-weight: 500;
    font-size: 12px;
    cursor: pointer;
  }
`;

const ContentCard = styled.div`
  & h4 {
    font-weight: 500;
  }
`;

const Content = styled.div`
  margin-top: 40px;
`;

const HeaderInfo = styled.div`
  display: grid;
  grid-template-columns: 35% 17% 17% 15% 11%;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  align-items: flex-end;
  justify-items: flex-start;
  padding: 10px 0;
  & div p {
    font-family: "Poppins";
    font-size: 12px;
    line-height: 120%;
    color: #727f88;
    padding: 0 27px 0 0;
    margin-bottom: 5px;
  }
`;

const ContentProducts = styled.div`
  max-height: calc(100vh - 290px);
  overflow: scroll;
`;

const SellTitle = styled.h3`
  color: #2d4665;
  font-weight: 400;
  font-size: ${({ isOpen }) => (isOpen ? "20px" : "14px")};
  transition: font-size 0.2s ease-out;
`;

const FooterActions = styled.div`
  background: #f4fcf6;
  padding: 10px 20px;
  & h2 {
    font-size: 18px;
    font-weight: 500;
    & span {
      color: #02c567;
    }
    & small {
      font-weight: 400;
    }
  }
  & p {
    font-size: 12px;
    & span {
      text-transform: capitalize;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #4b88ee;
  color: #fff;
  border: none;
  padding: 7px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
`;

const RemoveButton = styled.button`
  background-color: #d2131226;
  color: #d21312;
  padding: 7px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  margin-right: 10px;
  border: none;
`;

export const SalesCard = ({
  created_at,
  uuid,
  products,
  salesToday,
  setSalesToday,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (products.length > 0) {
      const totalPriceOfAllProducts = products.map(
        (product) => product.total_price
      );
      const initialValue = 0;
      const sumWithInitial = totalPriceOfAllProducts.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );

      setTotal(sumWithInitial);
    }
  }, []);

  const printTicket = () => {
    window.open(`/print-ticket/${uuid}`, "_blank");
  };

  const deleteSaleHandle = () => {
    deleteSale(uuid)
      .then(() => {
        const salesTodayFiltered = salesToday.filter(
          (sale) => sale.uuid !== uuid
        );
        products.map((product) => {
          updateStock(product.uuid, product.purchased_amount)
            .then(() => {
              setSalesToday(salesTodayFiltered);
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <Card>
      <HeaderCard onClick={() => setIsOpen(!isOpen)}>
        <div>
          <SellTitle isOpen={isOpen}>Venta n.º {uuid}</SellTitle>
        </div>
        <div>
          <button>{isOpen ? "X Cerrar" : "Más detalles"}</button>
        </div>
      </HeaderCard>
      {isOpen && (
        <ContentCard>
          <Content>
            <Header>
              <div>
                <h4>Productos</h4>
              </div>
              <div>
                <RemoveButton onClick={deleteSaleHandle}>
                  Cancelar venta
                </RemoveButton>
                <Button onClick={printTicket}>Reimprimir Ticket</Button>
              </div>
            </Header>
            <HeaderInfo>
              <div>
                <p>Nombre del producto</p>
              </div>
              <div>
                <p>Cantidad</p>
              </div>
              <div>
                <p>Precio</p>
              </div>
              <div>
                <p>Subtotal</p>
              </div>
              <div />
            </HeaderInfo>
            <ContentProducts>
              {products.map((product, index) => (
                <ProductCard product={product} index={index} />
              ))}
            </ContentProducts>
          </Content>
          <FooterActions>
            <h2>
              Fue una venta de{" "}
              <span>
                {" "}
                ${separator(total)} <small>MXN</small>{" "}
              </span>
            </h2>
            <p>
              {moment(
                new window.Date(created_at.seconds * 1000).toJSON()
              ).format("LL HH:mm a")}
            </p>
          </FooterActions>
        </ContentCard>
      )}
      <Toaster position="bottom-right" />
    </Card>
  );
};
