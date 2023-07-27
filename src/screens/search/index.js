import React, { useState } from "react";
import { useEffectOnce } from "../../utils/useEffectOnce";
import styled from "styled-components";
import { WrapperContent, DescriptionContent } from "../../styles";
import { ProductCard } from "./ProductCard";
import { Cart } from "../../components/cart";
import { db } from "../../firebase";
import { useMediaQuery } from "react-responsive";
import { DrawerCart } from "../../components/cart/DrawerCart";

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

const SearchWrapper = styled.div`
  margin-top: 60px;
  padding: 0px 30px 0px 0;
  @media screen and (max-width: 768px) {
    margin: 20px 0;
    padding: 0 20px;
  }
`;

const InputSearch = styled.input`
  width: 100%;
  font-size: 37px;
  border: none;
  background: transparent;
  font-family: "Poppins";
  font-weight: 500;
  color: #000;
  &:focus-visible {
    outline: none;
    border: none;
    box-shadow: none;
  }
`;

const ContentProducts = styled.div`
  max-height: calc(100vh - 290px);
  overflow: scroll;
`;

export const Search = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [cart, setCart] = useState([]);

  const [products, setProducts] = useState([]);
  const [productsLegacy, setProductsLegacy] = useState([]);

  useEffectOnce(() => {
    db.collection("stock").onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data() });
      });
      setProducts(documents);
      setProductsLegacy(documents);
    });
  }, []);

  const searchProducts = (e) => {
    setProductsLegacy([]);
    const value = e.target.value;
    const productsFiltered = products.filter((entry) =>
      Object.values(entry).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(value.toLowerCase())
      )
    );
    setProductsLegacy([]);
    setProductsLegacy(productsFiltered);
  };

  return (
    <WrapperContent>
      <SearchWrapper>
        <InputSearch
          placeholder="Buscar producto..."
          onChange={(e) => searchProducts(e)}
        />
        <DescriptionContent>
          {productsLegacy.length} Productos encontrados
        </DescriptionContent>
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
            {productsLegacy.map((product, index) => (
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
