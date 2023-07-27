import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Menu, Item } from "burger-menu";
import logo from "../../assets/images/logo.png";
import { Logo } from "../../styles/GlobalStyles";
import IconMenu from "../../assets/icons/menu-icon.svg";
import "burger-menu/lib/index.css";
import { useMediaQuery } from "react-responsive";

export const WrapperIcon = styled.div`
  padding: 20px 20px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid grey;
  padding-bottom: 10px;
  align-items: center;
  @media screen and (min-width: 420px) {
    display: none;
  }
`;

export const NavMobile = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);

  const location = useLocation().pathname.substring(1);

  useEffect(() => {
    if (location.includes("print-ticket")) {
      setShow(false);
    }
  }, []);

  return (
    <div>
      {show && (
        <div>
          {isMobile && (
            <WrapperIcon onClick={() => setIsOpen(!isOpen)}>
              <div>
                <Logo src={logo} />
              </div>
              <div>
                <img src={IconMenu} alt="menu" />
              </div>
            </WrapperIcon>
          )}
          <Menu
            className="burger-menu"
            isOpen={isOpen}
            selectedKey={"entry"}
            onClose={() => setIsOpen(false)}
          >
            <Link to="/dashboard">
              <Item
                itemKey={"home"}
                text={"Home"}
                onClick={() => setIsOpen(false)}
              ></Item>
            </Link>
            <Link to="/search">
              <Item
                itemKey={"search"}
                text={"Buscar"}
                onClick={() => setIsOpen(false)}
              ></Item>
            </Link>
            <Link to="/inventory">
              <Item
                itemKey={"inventory"}
                text={"Inventario"}
                onClick={() => setIsOpen(false)}
              ></Item>
            </Link>
            <Link to="/reports">
              <Item
                itemKey={"reports"}
                text={"Reportes"}
                onClick={() => setIsOpen(false)}
              ></Item>
            </Link>
            <Link to="/costs">
              <Item
                itemKey={"costs"}
                text={"Gastos"}
                onClick={() => setIsOpen(false)}
              ></Item>
            </Link>
          </Menu>
        </div>
      )}
    </div>
  );
};
