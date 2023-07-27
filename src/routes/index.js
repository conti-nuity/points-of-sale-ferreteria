import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GlobalStyles } from "../styles/GlobalStyles";
import { Navegation } from "../components/nav";
import { Wrapper } from "../styles";
import { Login } from "../screens/auth/login";
import { Dashboard } from "../screens/dashboard";
import { Search } from "../screens/search";
import { TicketPrint } from "../screens/ticket";
import { Inventory } from "../screens/inventory";
import { Costs } from "../screens/costs";
import { Reports } from "../screens/reports";
import { useMediaQuery } from "react-responsive";
import { NavMobile } from "../components/nav/NavMobile";

export const Routing = () => {
  const [hideNavegation, setHideNavegation] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrapper hideNavegation={hideNavegation}>
        {!isMobile ? (
          <Navegation
            hideNavegation={hideNavegation}
            setHideNavegation={setHideNavegation}
          />
        ) : (
          <NavMobile />
        )}
        <div>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/search" element={<Search />} />
            <Route
              exact
              path="/print-ticket/:ticket_id"
              element={<TicketPrint />}
            />
            <Route exact path="/inventory" element={<Inventory />} />
            <Route exact path="/costs" element={<Costs />} />
            <Route exact path="/reports" element={<Reports />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Wrapper>
    </BrowserRouter>
  );
};
