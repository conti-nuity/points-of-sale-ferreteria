import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { InventoryWrapper, Header, Title, Description } from "./styles";
import { WrapperContent } from "../../styles";
import { AddInventoryForm } from "./AddInventoryForm";
import { Modal } from "../../components/Modal";
import { useFinder } from "../../hooks/useFinder";
import { ProductCard } from "./ProductCard";
import { useStockStore } from "../../store";

const Content = styled.div`
  margin-top: 60px;
`;

const HeaderInfo = styled.div`
  display: grid;
  grid-template-columns: 35% 17% 17% 15% 11%;
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

const StockLength = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #000;
`;

const Input = styled.input`
  position: sticky;
  top: 20px;
  margin-top: 20px;
  padding: 17px;
  width: 100%;
  border-radius: 6px;
  border: none;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0), 0 4px 8px rgba(0, 0, 0, 0.03);
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Inventory = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [productsLegacy, setProductsLegacy] = useState([]);
  const [productSelected, setProductSelected] = useState({});

  // Store
  const stock = useStockStore((state) => state.stock);
  const setStock = useStockStore((state) => state.setStock);

  // Filter value
  const [filterName, setFilterName] = useState(null);

  // Finder
  const filteredData = useFinder(filterName, stock);

  const productEdit = (product) => {
    setShowModal(true);
    setProductSelected(product);
  };

  const closeModal = () => {
    setShowModal(false);
    setProductSelected({});
  };

  const monthMinusOneName = moment()
    // .subtract(1, "month")
    .startOf("month")
    .format("MMMM");

  return (
    <WrapperContent>
      <InventoryWrapper>
        <Header>
          <div>
            <Title>Inventario</Title>
            <StockLength>{stock.length} Productos</StockLength>
          </div>
          <div>
            <button onClick={() => setShowModal(true)}>
              + Agregar producto
            </button>
          </div>
        </Header>
        <Description>
          Inventario del mes de {monthMinusOneName} del{" "}
          {new window.Date().getFullYear()}
        </Description>
        <Input
          placeholder="Buscar producto..."
          onChange={(e) => setFilterName(e.target.value)}
        />
        <Content>
          <HeaderInfo>
            <div>
              <p>Nombre del producto</p>
            </div>
            <div>
              <p>Precio</p>
            </div>
            <div>
              <p>Inventario disponible</p>
            </div>
            <div />
          </HeaderInfo>
          {filteredData.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              productEdit={productEdit}
            />
          ))}
        </Content>
      </InventoryWrapper>
      <Modal
        size="large"
        isShowModal={isShowModal}
        methodClose={closeModal}
        hideHeader={true}
        hideScroll={true}
      >
        <AddInventoryForm product={productSelected} setShowModal={closeModal} />
      </Modal>
    </WrapperContent>
  );
};
