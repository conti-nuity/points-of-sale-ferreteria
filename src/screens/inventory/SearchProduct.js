import React, { useState } from "react";
import styled from "styled-components";
import { useEffectOnce } from "../../utils/useEffectOnce";
import { db } from "../../firebase";

const Input = styled.input`
  margin-top: 20px;
  padding: 17px;
  width: 400px;
  border-radius: 6px;
  border: none;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchProduct = ({ setProductsLegacy }) => {
  const [products, setProducts] = useState([]);

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
    const value = e.target.value;
    const productsFiltered = products.filter((entry) =>
      Object.values(entry).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(value.toLowerCase())
      )
    );
    setProductsLegacy(productsFiltered);
  };

  return (
    <div>
      <Input
        placeholder="Busca un producto"
        onChange={(e) => searchProducts(e)}
      />
    </div>
  );
};
