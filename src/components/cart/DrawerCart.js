import React, { useState } from "react";
import styled from "styled-components";

const Content = styled.div`
  position: fixed;
  width: 90%;
  height: ${({ open }) => (open ? "94vh" : "70px")};
  bottom: 33px;
  margin: 0 20px;
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 8%) 0px 8px 16px, rgb(0 0 0 / 6%) 0px 4px 8px;
  cursor: pointer;
  transition: height 0.2s ease-out;
`;

const Title = styled.p`
  font-size: ${({ open }) => (open ? "28px" : "14px")};
  font-weight: ${({ open }) => (open ? "500" : "400")};
  transition: font-size 0.2s ease-out;
  & span {
    display: ${({ open }) => (open ? "none" : "inline-block")};
  }
`;

export const DrawerCart = () => {
  const [open, setOpen] = useState(false);

  return (
    <Content open={open} onClick={() => setOpen(!open)}>
      <div>
        <Title open={open}>
          Canasta<span>: 3 productos </span>
        </Title>
      </div>
    </Content>
  );
};
