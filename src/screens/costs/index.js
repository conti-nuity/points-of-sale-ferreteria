import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/es"; // without this line it didn't work
import { separator } from "../../utils/funcitons";
import {
  InventoryWrapper,
  Header,
  Title,
  Description,
  Content,
  HeaderInfo,
  Card,
  ContentDateRange,
  ButtonAdd,
  ButtonAddDateRange,
} from "./styles";
import { WrapperContent } from "../../styles";
import { getCosts } from "../../api/actions";
import { AddCostForm } from "./AddCostForm";
import { Modal } from "../../components/Modal";
import { DateRange } from "../../components/DateRange";
import { CostsList } from "../../components/CostsList";

export const Costs = () => {
  moment.locale("es");
  const [isShowModal, setShowModal] = useState(false);
  const [isShowDateRange, setShowDateRange] = useState(false);
  const [costs, setCosts] = useState([]);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  useEffect(() => {
    const startDate = new window.Date();
    const endDate = new window.Date();
    startDate.setHours(0, 0, 0, 0);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setHours(0, 0, 0, 0);

    getCosts(startDate, endDate).then((response) => {
      setCosts([...response]);
    });
  }, []);

  const getCostsHandler = () => {
    getCosts(selectionRange.startDate, selectionRange.endDate).then(
      (response) => {
        setCosts([...response]);
        setShowDateRange(false);
      }
    );
  };

  return (
    <WrapperContent>
      <InventoryWrapper>
        <Header>
          <div>
            <Title>Costos</Title>
          </div>
          <div>
            <ButtonAdd onClick={() => setShowModal(true)}>
              + Agregar costo
            </ButtonAdd>
          </div>
        </Header>
        <Description>Agrega los costos que sean necesarios </Description>
        <ButtonAdd onClick={() => setShowDateRange(true)}>
          Filtrar por rango de fechas
        </ButtonAdd>
        <Modal
          size="extra-large"
          isShowModal={isShowDateRange}
          methodClose={setShowDateRange}
          hideHeader={true}
          hideScroll={true}
        >
          <ContentDateRange>
            <DateRange
              setCosts={setCosts}
              selectionRange={selectionRange}
              setSelectionRange={setSelectionRange}
            />
            <ButtonAddDateRange onClick={getCostsHandler}>
              Aplicar
            </ButtonAddDateRange>
          </ContentDateRange>
        </Modal>
        {!!costs.length && <CostsList costs={costs} />}
      </InventoryWrapper>
      <Modal
        size="large"
        isShowModal={isShowModal}
        methodClose={setShowModal}
        hideHeader={true}
        hideScroll={true}
      >
        <AddCostForm setShowModal={setShowModal} />
      </Modal>
    </WrapperContent>
  );
};
