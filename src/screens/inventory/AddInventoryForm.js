import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Checkbox } from "../../components/Checkbox";
import { Input } from "../../components/Input";
import { Field, ButtonAdd } from "../../styles/GlobalStyles";
import { useEffectOnce } from "../../utils/useEffectOnce";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastModel } from "../../utils/toast";

import {
  updateProducttoInventory,
  addProducttoInventory,
} from "../../api/actions";

const Wrapper = styled.div`
  & h2 {
    margin-bottom: 50px;
    font-weight: 500;
    text-align: center;
  }
`;

const Form = styled.form`
  margin: 30px 0 5px;
`;

const WrapperCheckboxs = styled.div`
  display: grid;
  grid-template-columns: 25% 25%;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  & label {
    margin-left: 4px;
    font-family: "Montserrat";
    font-weight: 400;
    position: relative;
    top: 5px;
  }
  & p {
    margin: 0;
    position: relative;
    top: 12px;
    font-family: "Montserrat";
    font-weight: 400;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 30% 30%;
    margin-left: 0px;
  }
`;

const ContentCheckboxs = styled.div`
  display: flex;
  align-items: center;
  & p {
    font-family: "Poppins";
    font-size: 13px;
    margin-top: -25px;
    margin-left: 10px;
  }
`;

const FieldCheckbox = styled.div`
  cursor: pointer;
  & input {
    cursor: pointer;
    transform: scale(1.4);
  }
  & label {
    margin-left: 4px;
    font-family: "Montserrat";
    font-weight: 400;
    & a {
      position: relative;
      z-index: 99;
    }
  }
  @media screen and (max-width: 768px) {
    & input {
      transform: scale(1.5);
    }
    & label {
      margin-left: 7px;
    }
  }
  @media screen and (min-width: 1280px) and (max-width: 1435px) {
    & input {
      transform: scale(1.3);
    }
  }
`;

const ErrorLabel = styled.label`
  display: block;
  margin-top: 10px;
  font-family: "Poppins" !important;
  font-weight: 600;
  color: #e74d33 !important;
  font-size: 12px !important;
`;

export const AddInventoryForm = ({ product, setShowModal }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const itsForEdit = Object.keys(product).length;

  const [status, setStatus] = useState();

  const [loading, setLoading] = useState(false);

  const onSubmit = (dataForm) => {
    setLoading(true);
    if (itsForEdit) {
      updateProducttoInventory(product.uuid, dataForm)
        .then((response) => {
          reset();
          toast.success("Producto actualizado exitosamente!", {
            ...toastModel,
          });
          setLoading(false);
          setTimeout(() => {
            setShowModal(false);
          }, 1500);
        })
        .catch((error) => {
          setStatus(
            "Ocurrio un error, intenta ponerte en contacto con el desarrollador"
          );
        });
    } else {
      addProducttoInventory(dataForm)
        .then((response) => {
          reset();
          toast.success("Producto agregado exitosamente!", {
            ...toastModel,
          });
          setLoading(false);
          setTimeout(() => {
            setShowModal(false);
          }, 1500);
        })
        .catch((error) => {
          setStatus(
            "Ocurrio un error, intenta ponerte en contacto con el desarrollador"
          );
        });
    }
  };

  const [itsPerfil, setItsPerfil] = useState(false);

  useEffectOnce(() => {
    if (itsForEdit) {
      const values = [
        "name",
        "unit_measure",
        "its_profile",
        "dealer_price",
        "sell_price",
        "perfil_weight",
        "price_dealer_perfil_x_kilo",
        "price_sell_perfil_x_kilo",
        "stock",
        "is_product_variable",
      ];
      setItsPerfil(product.its_profile[0] === "0" ? false : true);
      values.map((value) => setValue(value, product[value]));
    } else {
      setValue("its_profile", ["0"]);
      setValue("is_product_variable", undefined);
      setItsPerfil(false);
    }
  }, []);

  useEffect(() => {
    if (itsPerfil) {
      setValue(
        "sell_price",
        watch("perfil_weight") * watch("price_sell_perfil_x_kilo")
      );
      setValue(
        "dealer_price",
        watch("perfil_weight") * watch("price_dealer_perfil_x_kilo")
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("perfil_weight"), watch("price_sell_perfil_x_kilo")]);

  return (
    <Wrapper>
      <h2>{itsForEdit ? "Editar productor" : "Agregar producto"}</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field columns={2}>
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
          <div>
            <label>Medida de unidad</label>
            <Input
              type="text"
              register={register}
              errors={errors}
              keyName="unit_measure"
              placeholder="Medida de unidad"
            />
          </div>
        </Field>
        <div style={{ margin: "20px 0" }}>
          <label
            style={{ display: "block", marginBottom: "10px", fontSize: "13px" }}
          >
            ¿Es un perfil?
          </label>
          <div style={{ marginLeft: "5px" }}>
            <WrapperCheckboxs>
              <ContentCheckboxs>
                <FieldCheckbox>
                  <input
                    type="checkbox"
                    checked={
                      watch("its_profile") &&
                      parseInt(watch("its_profile")[0]) === 1
                        ? true
                        : false
                      // watch("its_profile") && watch("its_profile") === true
                      //   ? true
                      //   : false
                    }
                    value={1}
                    onChange={() => {
                      setItsPerfil(true);
                      setValue("its_profile", ["1"]);
                    }}
                  />
                </FieldCheckbox>
                <p>Si</p>
              </ContentCheckboxs>
              <ContentCheckboxs>
                <FieldCheckbox>
                  <input
                    type="checkbox"
                    checked={
                      watch("its_profile") &&
                      parseInt(watch("its_profile")[0]) === 0
                        ? true
                        : false
                      // watch("its_profile") && watch("its_profile") === false
                      //   ? true
                      //   : false
                    }
                    value={0}
                    onChange={() => {
                      setItsPerfil(false);
                      setValue("its_profile", ["0"]);
                    }}
                  />
                </FieldCheckbox>
                <p>No</p>
              </ContentCheckboxs>
            </WrapperCheckboxs>
            {errors.dietitianBefore && (
              <ErrorLabel>* This field is required</ErrorLabel>
            )}
          </div>
        </div>

        {itsPerfil ? (
          <>
            <Field columns={2}>
              <div>
                <label>Peso del perfil (kg)</label>
                <Input
                  type="number"
                  register={register}
                  errors={errors}
                  keyName="perfil_weight"
                  placeholder="Peso del perfil"
                />
              </div>
              <div>
                <label>Precio x kg distribuidor</label>
                <Input
                  type="number"
                  register={register}
                  errors={errors}
                  keyName="price_dealer_perfil_x_kilo"
                  placeholder="Precio x kilo distribuidor"
                />
              </div>
            </Field>
            <Field columns={2}>
              <div>
                <label>Precio x kg venta</label>
                <Input
                  type="number"
                  register={register}
                  errors={errors}
                  keyName="price_sell_perfil_x_kilo"
                  placeholder="Precio x kilo venta"
                />
              </div>
              <div>
                <label>Precio venta</label>
                <Input
                  type="number"
                  register={register}
                  errors={errors}
                  keyName="sell_price"
                  // value={
                  //   watch("perfil_weight") * watch("price_sell_perfil_x_kilo")
                  // }
                  placeholder="Precio venta"
                />
              </div>
            </Field>
          </>
        ) : (
          <Field columns={2}>
            <div>
              <label>Precio distribuidor</label>
              <Input
                type="number"
                register={register}
                errors={errors}
                keyName="dealer_price"
                placeholder="Precio distribuidor"
              />
            </div>
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
          </Field>
        )}
        <Field columns={2}>
          <div>
            <label>Inventario</label>
            <Input
              type="number"
              register={register}
              errors={errors}
              keyName="stock"
              placeholder="Inventario"
            />
          </div>
          <div>
            <label>Es producto variable?</label>
            <WrapperCheckboxs>
              <ContentCheckboxs>
                <FieldCheckbox>
                  <Checkbox
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    value={1}
                    keyName="is_product_variable"
                  />
                </FieldCheckbox>
                <p>Si</p>
              </ContentCheckboxs>
              <ContentCheckboxs>
                <FieldCheckbox>
                  <Checkbox
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    value={0}
                    keyName="is_product_variable"
                  />
                </FieldCheckbox>
                <p>No</p>
              </ContentCheckboxs>
            </WrapperCheckboxs>
            {errors.dietitianBefore && (
              <ErrorLabel>* This field is required</ErrorLabel>
            )}
          </div>
        </Field>
        <div>
          <ButtonAdd
            role="button"
            type="submit"
            value={
              loading
                ? "Cargando..."
                : itsForEdit
                ? "Guardar cambios"
                : "Agregar producto"
            }
          />
          <ToastContainer />
        </div>
        <div>
          <p>{status}</p>
        </div>
      </Form>
    </Wrapper>
  );
};
