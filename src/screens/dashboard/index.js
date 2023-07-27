import React, { useState } from "react";
import { useEffectOnce } from "../../utils/useEffectOnce";
import { Wrapper, Title, Description } from "./styles";
import { SalesList } from "../../components/salesList";
import { getSales } from "../../api/actions";
import moment from "moment";

export const Dashboard = () => {
  const [salesToday, setSalesToday] = useState([]);

  useEffectOnce(() => {
    const startDate = new window.Date();
    const endDate = new window.Date();
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(24, 0, 0, 0);
    getSales(startDate, endDate).then((response) => {
      setSalesToday([...response]);
    });
  }, []);

  return (
    <Wrapper>
      <Title>Ventas de hoy...</Title>
      <Description> {moment(new window.Date()).format("LL")}</Description>
      <SalesList salesToday={salesToday} setSalesToday={setSalesToday} />
    </Wrapper>
  );
};
