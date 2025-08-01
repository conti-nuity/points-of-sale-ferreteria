import React, { useState } from "react";
import { useEffectOnce } from "../../utils/useEffectOnce";
import styled from "styled-components";
import { WrapperContent, DescriptionContent } from "../../styles";
import { ProductCard } from "./ProductCard";
import { Cart } from "../../components/cart";
import { useMediaQuery } from "react-responsive";
import { DrawerCart } from "../../components/cart/DrawerCart";
import { getStock } from "../../api/stock";
import { useStockStore } from "../../store";
import { useFinder } from "../../hooks/useFinder";

const Content = styled.div`
  margin-top: 10px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  color: #000;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 28px;
  & span {
    color: #f95454;
    font-weight: 600;
  }
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

const SearchWrapper = styled.div`
  margin-top: 30px;
  padding: 0px 30px 0px 0;
  @media screen and (max-width: 768px) {
    margin: 20px 0;
    padding: 0 20px;
  }
`;

const InputSearch = styled.input`
  width: 100%;
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid grey;
  padding: 12px;
  background: transparent;
  font-family: "Poppins";
  font-weight: 400;
  color: #000;
  margin-bottom: 10px;
  &:focus-visible {
    outline: none;
    box-shadow: none;
  }
`;

const ContentProducts = styled.div`
  max-height: calc(100vh - 215px);
  overflow: scroll;
`;

export const Search = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // Store
  const stock = useStockStore((state) => state.stock);
  const setStock = useStockStore((state) => state.setStock);

  // Filter value
  const [filterName, setFilterName] = useState(null);

  // Finder
  const filteredData = useFinder(filterName, stock);

  useEffectOnce(() => {
    if (!stock.length) {
      getStock().then((response) => {
        setStock([...response]);
      });
    }
  }, []);

  // Cart
  const [cart, setCart] = useState([]);

  return (
    <WrapperContent>
      <SearchWrapper>
        <Flex>
          <Title>
            Buscar Producto <span> Glorieta </span>
          </Title>
          <DescriptionContent>
            {filteredData.length} Productos encontrados
          </DescriptionContent>
        </Flex>
        <InputSearch
          placeholder="Escribe el nombre del producto"
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
              <p>Cantidad de unidad</p>
            </div>
            <div>
              <p>Inventario disponible</p>
            </div>
            <div />
          </HeaderInfo>
          <ContentProducts>
            {filteredData.map((product, index) => (
              <ProductCard
                product={product}
                index={index}
                cart={cart}
                setCart={setCart}
              />
            ))}
          </ContentProducts>
        </Content>
      </SearchWrapper>
      {!isMobile ? (
        <Cart cart={cart} setCart={setCart} />
      ) : (
        <DrawerCart cart={cart} setCart={setCart} />
      )}
    </WrapperContent>
  );
};
