import { useEffectOnce } from "../../utils/useEffectOnce";
import { Wrapper, Title, Description } from "./styles";
import { SalesList } from "../../components/salesList";
import { getSales } from "../../api/actions";
import { useSalesStore } from "../../store";
import moment from "moment";

export const Dashboard = () => {
  // Store
  const sales = useSalesStore((state) => state.sales);
  const setSales = useSalesStore((state) => state.setSales);

  useEffectOnce(() => {
    const startDate = new window.Date();
    const endDate = new window.Date();
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(24, 0, 0, 0);
    console.log("startDate", startDate);
    // if (!sales.length) {
    //   getSales(startDate, endDate).then((response) => {
    //     setSales([...response]);
    //   });
    // }
  }, []);

  return (
    <Wrapper>
      <Title>Ventas de hoy...</Title>
      <Description> {moment(new window.Date()).format("LL")}</Description>
      <SalesList salesToday={sales} />
    </Wrapper>
  );
};
