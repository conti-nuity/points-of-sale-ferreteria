import React, { Fragment, useRef } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { useOutsideModal } from "../utils/useOutsideModal";

// Animations
import { fadeInAnimation, fadeInUpAnimation } from "../utils/animations";

const Wrapper = styled.div`
  position: relative;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  animation: 0.2s ${fadeInAnimation};
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: #ffffff;
  padding: 40px;
  ${({ size }) =>
    (size === "small" &&
      css`
        width: 420px;
      `) ||
    (size === "medium" &&
      css`
        width: 470px;
      `) ||
    (size === "large" &&
      css`
        width: 550px;
      `) ||
    (size === "extra-large" &&
      css`
        width: 780px;
      `)};
  max-height: 690px;
  margin: 25em 0;
  overflow-y: hidden;
  overflow-x: hidden;
  overflow: ${({ hideScroll }) =>
    hideScroll === true ? "initial" : "hidden scroll"};
  border-radius: 3px;
  animation-delay: 0.4s;
  animation: 0.3s ${fadeInUpAnimation};
  cursor: default;
  @media screen and (max-width: 768px) {
    width: 339px;
    max-height: 580px;
    margin: 27em 15px;
    overflow: scroll;
  }
`;

export const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
  background: transparent;
  z-index: 30;
  div h3 {
    font-size: 21px;
    font-family: "PlusJakartaSansBold";
  }
  span {
    padding: 6px;
    border-radius: 50px;
    color: #707070;
    cursor: pointer;
    &:hover,
    &:active {
      background: #f2f2f2;
    }
    a {
      color: #707070;
    }
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

export const Modal = ({
  size,
  methodClose,
  isShowModal,
  children,
  hideScroll,
  hideHeader,
}) => {
  const wrapperRef = useRef(null);
  useOutsideModal(wrapperRef, methodClose);

  if (!isShowModal) {
    return null;
  }

  return ReactDOM.createPortal(
    <Wrapper>
      <ModalContainer hideScroll={hideScroll} size={size} ref={wrapperRef}>
        {!hideHeader && (
          <ModalHeader>
            <div>
              <h3>Ya formas parte de Youcheck</h3>
            </div>
          </ModalHeader>
        )}
        <Fragment>{children}</Fragment>
      </ModalContainer>
    </Wrapper>,
    document.getElementById("modal-layout")
  );
};
