import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Field, ButtonAdd } from "../../styles/GlobalStyles";
import { addCost } from "../../api/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastModel } from "../../utils/toast";

const Form = styled.form`
  margin: 30px 0 0;
`;

const Title = styled.h2`
  margin-bottom: 50px;
  font-weight: 500;
  text-align: center;
`;

export const AddCostForm = ({ setShowModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (dataForm) => {
    setLoading(true);
    addCost(dataForm)
      .then((response) => {
        setLoading(false);
        toast.success("Costo agregado exitosamente!", {
          ...toastModel,
        });
        setTimeout(() => {
          setShowModal(false);
        }, 1500);
      })
      .catch((error) => {
        toast.error("Ocurrio un error, intentalo más tarde!", {
          ...toastModel,
        });
        setLoading(false);
      });
  };

  return (
    <div>
      <Title>Agregar costo</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field columns={2}>
          <div>
            <label>Nombre del costo</label>
            <Input
              type="text"
              register={register}
              errors={errors}
              keyName="name"
              placeholder="Nombre"
            />
          </div>
          <div>
            <label>Precio</label>
            <Input
              type="number"
              register={register}
              errors={errors}
              keyName="price"
              placeholder="Precio del costo"
            />
          </div>
        </Field>
        <Field columns={1}>
          <div>
            <label>Descripcion</label>
            <TextArea
              type="text"
              register={register}
              errors={errors}
              keyName="description"
              placeholder="Agrega una descripcion detallada del costo"
            />
          </div>
        </Field>
        <div>
          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
          <ButtonAdd
            role="button"
            type="submit"
            value={loading ? "Agregando..." : "Agregar costo"}
          />
          <ToastContainer />
        </div>
      </Form>
    </div>
  );
};
