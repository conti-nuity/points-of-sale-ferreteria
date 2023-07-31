import React, { useState } from "react";
import styled from "styled-components";
import { Field } from "../styles";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0;
  width: 600px;
  & button {
    margin-top: 30px;
    background-color: #4b88ee;
    color: #fff;
    border: none;
    cursor: pointer;
    padding: 12px 50px;
    border-radius: 4px;
  }
`;

export const Gearbox = ({ total, setGeneratedTicket }) => {
  const [entry, setEntry] = useState(total);

  const handleChange = (e) => {
    e.target.value ? setEntry(e.target.value) : setEntry(total);
  };

  return (
    <Wrapper>
      <div>
        <Field>
          <label>$ Monto ingresado</label>
          <input name="entry" onChange={(e) => handleChange(e)} type="number" />
        </Field>
      </div>
      <div>
        <Field>
          <label>$ Cambio</label>
          <input type="number" value={entry - total} />
        </Field>
      </div>
      <div>
        <button onClick={() => setGeneratedTicket(true)}>Cobrar</button>
      </div>
    </Wrapper>
  );
};
