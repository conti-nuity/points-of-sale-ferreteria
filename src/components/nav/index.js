import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import IconHome from "../../assets/icons/home-icon.svg";
import IconSearch from "../../assets/icons/search-icon.svg";
import IconInventory from "../../assets/icons/inventory-icon.svg";
import IconCosts from "../../assets/icons/costs-icon.svg";
import IconClipboard from "../../assets/icons/clipboard-icon.svg";
import logo from "../../assets/images/logo.png";
import { Logo } from "../../styles/GlobalStyles";
import { Wrapper, Content, ItemNavegation } from "./styles";

const Nav = styled.div`
  height: 100vh;
  position: sticky;
  top: 0px;
  background-color: rgb(255, 255, 255);
  border-right: 1px solid rgba(189, 205, 214, 0.59);
`;

const ContentLogo = styled.div`
  background-color: #dddddd94;
  width: 150px;
  height: 150px;
  margin: 30px auto 0;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
`;

const Sede = styled.p`
  text-align: center;
  color: #f95454;
  font-weight: 600;
  font-size: 18px;
`;

export const Navegation = ({ hideNavegation, setHideNavegation }) => {
  const navigate = useNavigate();
  const location = useLocation().pathname.substring(1);

  const itsLogin = JSON.parse(localStorage.getItem("itsLogin"));

  useEffect(() => {
    !itsLogin && navigate("/login");
  }, []);

  useEffect(() => {
    if (location.includes("print-ticket")) {
      setHideNavegation(true);
    } else if (location.includes("login")) {
      setHideNavegation(true);
    } else if (itsLogin) {
      setHideNavegation(false);
    }
    // location.includes("print-ticket") && setHideNavegation(true);
    // location.includes("login") && setHideNavegation(true);
    // itsLogin && setHideNavegation(false);
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  // if (!location.includes("login")) {
  //   setHideNavegation(false);
  // }
  return (
    <>
      {!hideNavegation && (
        <Nav>
          <ContentLogo>
            <Logo src={logo} />
            <Sede>Glorieta</Sede>
          </ContentLogo>
          <Wrapper>
            <Content>
              <ItemNavegation active={location === "dashboard" ? true : false}>
                <span onClick={() => navigate("/dashboard")}>
                  <img src={IconHome} alt="icon-home" />
                  <p>Dashboard</p>
                </span>
              </ItemNavegation>
              <ItemNavegation active={location === "search" ? true : false}>
                <span onClick={() => navigate("/search")}>
                  <img src={IconSearch} alt="icon-search" />
                  <p>Buscar</p>
                </span>
              </ItemNavegation>
              <ItemNavegation active={location === "inventory" ? true : false}>
                <span onClick={() => navigate("/inventory")}>
                  <img src={IconClipboard} alt="icon-inventory" />
                  <p>Inventario</p>
                </span>
              </ItemNavegation>
              <ItemNavegation active={location === "reports" ? true : false}>
                <span onClick={() => navigate("/reports")}>
                  <img src={IconInventory} alt="icon-reports" />
                  <p>Reportes</p>
                </span>
              </ItemNavegation>
              <ItemNavegation active={location === "costs" ? true : false}>
                <span onClick={() => navigate("/costs")}>
                  <img src={IconCosts} alt="icon-costs" />
                  <p>Costos</p>
                </span>
              </ItemNavegation>
            </Content>
          </Wrapper>
        </Nav>
      )}
    </>
  );
};
