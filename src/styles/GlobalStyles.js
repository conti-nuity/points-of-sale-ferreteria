import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html {
      box-sizing: border-box;
    }
    *, *:before, *:after {
      box-sizing: border-box;;
    }
    body {
        margin: 0;
        background-color: #efefff70;
    }
    h1, h2, h3, h4, p, button, a, label, input {
        margin: 0;
        font-family: 'Poppins';
    }
    a {
        text-decoration: none;
    }
    input {
      ::placeholder {
        color: #000;
        opacity: 1; /* Firefox */
      }
      :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #000;
      }
      ::-ms-input-placeholder { /* Microsoft Edge */
        color: #000;
      }
    }
    hr {
      border: 1px solid;
    }
    td,
    th,
    tr,
    table {
        border-top: 1px solid black;
        border-collapse: collapse;
    }

    td.producto,
    th.producto {
        width: 75px;
        max-width: 75px;
    }

    td.cantidad,
    th.cantidad {
        width: 40px;
        max-width: 40px;
        word-break: break-all;
    }

    td.precio,
    th.precio {
        width: 40px;
        max-width: 40px;
        word-break: break-all;
    }

    .centrado {
        text-align: center;
        align-content: center;
    }

    .grid {
      display: grid;
      grid-template-columns: 75% 25%;
      grid-template-rows: 1fr;
      grid-column-gap: 0px;
      grid-row-gap: 0px;
      /* text-align: center; */
    }

    .ticket {
      margin: auto;
      width: 240px;
      max-width: 240x;
    }

    img {
        max-width: inherit;
        width: inherit;
    }

    // Range date
    .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span, .rdrWeekDay, .rdrDayNumber span, .rdrStaticRangeLabel, .rdrMonthAndYearPickers select {
      font-family: 'Poppins';
    }
    .Toastify__toast-body > div:last-child {
      font-family: 'Jost' !important;
    }
    /* .rdrStaticRangeLabel {
      display: contents !important;
    }
    .rdrStaticRanges .rdrStaticRange:nth-child(1) {
      font-size: 0px;
    }
    .rdrStaticRanges .rdrStaticRange:nth-child(1)::after {
      content: 'Hoy';
      font-size: 12px;
      display: block;
      outline: 0;
      line-height: 18px;
      padding: 10px 20px;
      text-align: left;
    }
    .rdrStaticRanges .rdrStaticRange:nth-child(2) {
      font-size: 0px;
    }
    .rdrStaticRanges .rdrStaticRange:nth-child(2)::after {
      content: 'Ayer';
      font-size: 12px;
      display: block;
      outline: 0;
      line-height: 18px;
      padding: 10px 20px;
      text-align: left;
    } */
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  align-items: center;
  margin: 15px 0;
  & label {
    display: block;
    font-size: 13px;
    margin-bottom: 10px;
  }
  grid-template-areas:
    "aside main"
    "aside main";
  @media screen and (max-width: 768px) {
    grid-template-columns: 100%;
    grid-template-areas: initial;
    grid-row-gap: 10px;
  }
`;

export const ButtonAdd = styled.input`
  margin: 0;
  font-family: "Jost";
  color: #fff;
  background: #4b88ee;
  font-size: 14px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
`;

export const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin: 15px auto 10px;
  display: block;
  filter: brightness(1.1);
  mix-blend-mode: multiply;
  @media screen and (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin: 0 auto;
  }
`;
