import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "./Input";
import { TextArea } from "./TextArea";
import { Field, ButtonAdd } from "../styles/GlobalStyles";
import { addCost } from "../api/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastModel } from "../utils/toast";
import { getRandomArbitrary } from "../utils/funcitons";

const Form = styled.form`
  margin: 30px 0 0;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-weight: 500;
  text-align: center;
`;

const Desc = styled.p`
  margin-bottom: 50px;
  /* margin: 10px auto 40px; */
  font-size: 13px;
  text-align: center;
  color: #2d4665;
`;

export const AddExpressProduct = ({ cart, setCart, setShowModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (dataForm) => {
    const uuid = getRandomArbitrary(2, 3000000);
    setLoading(true);
    setCart([
      {
        uuid: uuid,
        created_at: new window.Date(),
        ...dataForm,
        dealer_price: parseFloat(dataForm.sell_price) / 2,
        sell_price: parseFloat(dataForm.sell_price),
        quantityAdded: parseFloat(dataForm.quantityAdded),
        unit_measure: "pza",
        totalPrice:
          parseFloat(dataForm.sell_price) * parseFloat(dataForm.quantityAdded),
      },
      ...cart,
    ]);
    setLoading(false);
    setShowModal(false);
  };

  return (
    <div>
      <Title>Agregar Producto Express</Title>
      <Desc>
        Este producto no sera agregado al inventarío, es solo para una venta en
        especifico
      </Desc>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field columns={1}>
          <div>
            <label>Nombre del producto</label>
            <Input
              type="text"
              register={register}
              errors={errors}
              keyName="name"
              placeholder="Nombre"
            />
          </div>
          {/* <div>
            <label>Medida de unidad</label>
            <Input
              type="text"
              register={register}
              errors={errors}
              keyName="unit_measure"
              placeholder="Medida de unidad"
            />
          </div> */}
        </Field>
        <Field columns={2}>
          <div>
            <label>Precio venta</label>
            <Input
              type="number"
              register={register}
              errors={errors}
              keyName="sell_price"
              placeholder="Precio venta"
            />
          </div>
          {/* <div>
            <label>Precio distribuidor</label>
            <Input
              type="number"
              register={register}
              errors={errors}
              keyName="dealer_price"
              placeholder="Precio distribuidor"
            />
          </div> */}
          <div>
            <label>Cantidad</label>
            <Input
              type="number"
              register={register}
              errors={errors}
              keyName="quantityAdded"
              placeholder="Cantidad"
            />
          </div>
        </Field>
        <div>
          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
          <ButtonAdd
            role="button"
            type="submit"
            value={loading ? "Agregando..." : "Agregar producto"}
          />
          <ToastContainer />
        </div>
      </Form>
    </div>
  );
};
