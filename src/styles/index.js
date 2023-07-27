import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${({ hideNavegation }) =>
    hideNavegation ? "100%" : "14% 83.5%"};
  grid-template-rows: repeat(1, 1fr);
  gap: 0px 35px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

export const WrapperContent = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleContent = styled.h1`
  color: #000;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 37px;
`;

export const DescriptionContent = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #000;
`;

export const Field = styled.div`
  & label {
    display: block;
    font-weight: 500;
    font-size: 14px;
  }
  & input {
    padding: 10px 25px 10px 10px;
    margin-top: 10px;
    background: transparent;
    border: 1px solid;
    border-radius: 4px;
  }
`;
