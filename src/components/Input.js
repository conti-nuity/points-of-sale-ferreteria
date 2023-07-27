import React from "react";
import styled from "styled-components";
import { fadeInAnimation } from "../utils/animations";

const InputComponent = styled.input`
  width: -webkit-fill-available;
  padding: 15px;
  background-color: transparent;
  border: 1px solid #1d1d1d;
  border-radius: 4px;
  font-family: "Poppins";
  font-size: 13px;
  color: #727f88;
  outline: none;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const ErrorLabel = styled.label`
  display: block;
  margin-top: 10px;
  font-family: "Poppins" !important;
  font-weight: 400;
  color: #e74d33 !important;
  font-size: 12px !important;
  animation: 0.15s ${fadeInAnimation} ease-out;
`;

export const Input = ({
  register,
  errors,
  keyName,
  value,
  placeholder,
  validate,
  type,
  minLength,
}) => {
  return (
    <div>
      <InputComponent
        {...register(keyName, {
          required: true,
          validate: validate,
          minLength: minLength,
        })}
        step="any"
        value={value}
        type={type}
        placeholder={placeholder}
      />
      {errors[keyName] && <ErrorLabel>* Este campo es requerido</ErrorLabel>}
    </div>
  );
};
