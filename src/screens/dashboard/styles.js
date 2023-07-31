import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 30px;
  padding: 0px 30px 0px 0;
  @media screen and (max-width: 768px) {
    margin: 20px 0;
    padding: 0 20px;
  }
`;

export const Title = styled.h1`
  color: #000;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 37px;
`;

export const Description = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #000;
`;
