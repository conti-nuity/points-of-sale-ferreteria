import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import {
  WrapperContent,
  HeaderContent,
  TitleContent,
  DescriptionContent,
} from "../../styles";
import { Modal } from "../../components/Modal";
import { DateRange } from "../../components/DateRange";
import { getReport } from "../../api/actions";
import { SalesList } from "../../components/salesList";
import { CostsList } from "../../components/CostsList";

const ButtonAdd = styled.button`
  margin: 10px 0;
  font-family: "Jost";
  color: #4b88ee;
  font-size: 14px;
  cursor: pointer;
  border: none;
  padding: 0;
  background-color: transparent;
`;

const ReportsWrapper = styled.div`
  margin: 60px 0 40px;
  padding: 0px 30px 0px 0;
  @media screen and (max-width: 768px) {
    margin: 20px 0;
    padding: 0 20px;
  }
`;

const ContentDateRange = styled.div`
  text-align: center;
  & h2 {
    font-weight: 500;
    margin-bottom: 0px;
  }
  & p {
    margin: 10px auto 40px;
    width: 50%;
    font-size: 13px;
    color: #2d4665;
  }
  @media screen and (max-width: 768px) {
    & p {
      width: 100%;
    }
  }
`;

const ButtonGenerateReport = styled.button`
  width: 200px;
  margin-top: 40px;
  font-family: "Jost";
  color: #fff;
  background: #4b88ee;
  font-size: 14px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
`;

const Insights = styled.div`
  position: relative;
  background-color: #fff;
  height: 100vh;
  padding: 50px 25px 20px;
  & ul {
    margin: 0;
    padding: 0;
    & li {
      list-style: none;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
`;

const Insight = styled.div`
  display: grid;
  grid-template-columns: 55% 45%;
  grid-template-rows: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 0px;
  align-items: center;
  border: 1px solid rgb(222, 227, 234);
  border-radius: 8px;
  padding: 10px 20px;
  & h4 {
    font-weight: 500;
  }
  & p {
    font-family: "Poppins";
    font-size: 12px;
  }
  & span {
    font-family: "Poppins";
    font-size: 14px;
  }
`;

const Field = styled.div``;

export const Reports = () => {
  const [isShowDateRange, setShowDateRange] = useState(false);
  const [whatReport, setWhatReport] = useState(false);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    title: "Reporte",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  const [loading, setLoading] = useState(false);

  const [totalPriceSell, setTotalPriceOfAllProductsSell] = useState(0);
  const [totalPriceDealer, setTotalPriceOfAllProductsDealer] = useState(0);
  const [totalCosts, setTotalCosts] = useState(0);

  const [sales, setSales] = useState([]);
  const [costs, setCosts] = useState([]);

  const generateReport = () => {
    setLoading(true);
    getReport("sales", selectionRange.startDate, selectionRange.endDate).then(
      (response) => {
        setSales([...response]);
        const totalPriceOfAllProductsSell = response.map((product) =>
          parseFloat(product.info.totalPriceSell)
        );
        const initialValueSell = 0;
        const sumWithInitialSell = totalPriceOfAllProductsSell.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          initialValueSell
        );
        setTotalPriceOfAllProductsSell(sumWithInitialSell);

        const totalPriceOfAllProductsDealer = response.map((product) =>
          parseFloat(product.info.totalDealer)
        );
        const initialValueDealer = 0;
        const sumWithInitialDealer = totalPriceOfAllProductsDealer.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          initialValueDealer
        );
        setTotalPriceOfAllProductsDealer(sumWithInitialDealer);

        // Get Reports
        getReport(
          "costs",
          selectionRange.startDate,
          selectionRange.endDate
        ).then((response) => {
          setCosts([...response]);
          const totalPriceOfAllProducts = response.map((product) =>
            parseFloat(product.price)
          );
          const initialValue = 0;
          const sumWithInitial = totalPriceOfAllProducts.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue
          );
          setTotalCosts(sumWithInitial);
          setLoading(false);
          setShowDateRange(false);
        });
      }
    );
  };

  return (
    <WrapperContent>
      <ReportsWrapper>
        <HeaderContent>
          <div>
            <TitleContent>Reportes</TitleContent>
          </div>
        </HeaderContent>
        <DescriptionContent>
          Genera un reporte de la utilidades mensuales, semanales, diarias o por
          cualquier rango de fechas <br /> contemplando los costos de venta y
          gastos.
        </DescriptionContent>
        <ButtonAdd onClick={() => setShowDateRange(true)}>
          Genera reporte
        </ButtonAdd>
        <div>
          <p>
            {moment(selectionRange.startDate).format("LL")} /{" "}
            {moment(selectionRange.endDate).format("LL")}
          </p>
        </div>
        {!!sales.length && (
          <Field>
            <div>
              <SalesList salesToday={sales} />
            </div>
          </Field>
        )}
        {!!costs.length && (
          <Field>
            <div>
              <CostsList costs={costs} />
            </div>
          </Field>
        )}
      </ReportsWrapper>
      <Insights>
        <ul>
          <li>
            <Insight>
              <div>
                <h4>Inversión</h4>
                <p>Suma de los precios distribuidor de las ventas</p>
              </div>
              <div>
                <span>${totalPriceDealer.toFixed(2)} MXN</span>
              </div>
            </Insight>
          </li>
          <li>
            <Insight>
              <div>
                <h4>Ventas</h4>
                <p>Suma de los precios venta de las ventas</p>
              </div>
              <div>
                <span>${totalPriceSell.toFixed(2)} MXN</span>
              </div>
            </Insight>
          </li>
          <li>
            <Insight>
              <div>
                <h4>Gastos</h4>
                <p>Suma de los precios de los gastos</p>
              </div>
              <div>
                <span>${totalCosts.toFixed(2)} MXN</span>
              </div>
            </Insight>
          </li>
          <li>
            <Insight>
              <div>
                <h4>Utilidades</h4>
                <p>Ganancias</p>
              </div>
              <div>
                <span>
                  $
                  {(totalPriceSell - (totalPriceDealer + totalCosts)).toFixed(
                    2
                  )}{" "}
                  MXN
                </span>
              </div>
            </Insight>
          </li>
        </ul>
        {/* <p>totalCosts {totalCosts}</p>
        <p>totalPriceSell {totalPriceSell}</p>
        <p>totalPriceDealer {totalPriceDealer}</p>
        <p>utilidad {totalPriceSell - (totalPriceDealer + totalCosts)}</p> */}
      </Insights>
      <Modal
        size="extra-large"
        isShowModal={isShowDateRange}
        methodClose={setShowDateRange}
        hideHeader={true}
        hideScroll={true}
      >
        <ContentDateRange>
          <h2>Generar reporte</h2>
          <p>
            Selecciona un rango de fechas para poder generar y descargar en
            automatico el reporte{" "}
          </p>
          <DateRange
            selectionRange={selectionRange}
            setSelectionRange={setSelectionRange}
          />
          <ButtonGenerateReport onClick={generateReport}>
            {loading ? "Cargando..." : "Generar reporte"}
          </ButtonGenerateReport>
        </ContentDateRange>
      </Modal>
    </WrapperContent>
  );
};
