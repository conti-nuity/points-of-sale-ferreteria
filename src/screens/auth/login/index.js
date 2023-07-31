import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "../../../firebase";
import { useForm } from "react-hook-form";
import { Field } from "../../../styles/GlobalStyles";
import { Input } from "../../../components/Input";

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95vh;
`;

const Form = styled.form`
  background: #fff;
  padding: 50px;
  width: 500px;
`;

const Legend = styled.span`
  display: block;
  font-family: "Poppins";
  font-size: 12px;
  color: grey;
  text-align: center;
`;

const Button = styled.input`
  width: 98%;
  background-color: #4b88ee;
  border: none;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
`;

export const Login = () => {
  const itsLogin = JSON.parse(localStorage.getItem("itsLogin"));
  const navigate = useNavigate();

  useEffect(() => {
    itsLogin && navigate("/search");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (dataForm) => {
    setLoading(true);
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(dataForm.email, dataForm.password)
      .then((response) => {
        localStorage.setItem("itsLogin", true);
        setLoading(false);
        navigate("/search");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>Iniciar Sesion</h2>
          <Field columns={1}>
            <Input
              type="email"
              register={register}
              errors={errors}
              keyName="email"
              placeholder="Correo Electronico"
            />
          </Field>
          <Field columns={1}>
            <Input
              type="password"
              register={register}
              errors={errors}
              keyName="password"
              placeholder="Contraseña"
            />
          </Field>
          <div>
            <Button
              role="button"
              type="submit"
              value={loading ? "Cargando..." : "Ingresar"}
            />
          </div>
        </Form>
      </Content>
      <div>
        <Legend>Puntos de venta Ferretería y Perfiles "Glorieta" v1.0.0</Legend>
      </div>
    </div>
  );
};
