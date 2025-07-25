import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffectOnce } from "../utils/useEffectOnce";
import { useParams } from "react-router-dom";
import { getSale } from "../api/actions";
import logo from "../assets/images/logo.png";
import whatsApp from "../assets/images/whatsapp.svg";
import { Logo } from "../styles/GlobalStyles";
import moment from "moment";

export const TicketPreview = () => {
  const location = useLocation().pathname.substring(1);

  const [saleInfo, setSaleInfo] = useState({});

  let { ticket_id } = useParams(); // Unpacking and retrieve id

  useEffectOnce(() => {
    getSale(ticket_id).then((res) => {
      setSaleInfo(res);
      setTimeout(() => {
        location.includes("print-ticket") && window.print();
      }, "1000");
    });
  }, []);

  return (
    <div class="ticket">
      <br />
      <br />
      <div class="centrado" style={{ marginBottom: "20px" }}>
        <Logo src={logo} />
        <h3>Ferretería y Perfiles</h3>
        <h2>"GLORIETA"</h2>
      </div>
      <p>
        <div class="centrado">
          <p class="centrado" style={{ fontSize: "11px" }}>
            TEL: 555644-8728 y 557044-0651
          </p>
          <p class="centrado" style={{ fontSize: "11px" }}>
            <img
              src={whatsApp}
              width="12px"
              height="12px"
              style={{ verticalAlign: "middle", marginRight: "2px" }}
            />
            5574497706
          </p>
          <p style={{ fontSize: "11px" }}>R.F.C JIGR630601KA5</p>
          {/* <p style={{ fontSize: "11px" }}>
            Perfiles, lamina lisa, galvanizada y ondulada, tira de cortina y
            todo para la herrería, artículos de plomería, tubería
          </p> */}
        </div>
        <p class="centrado" style={{ fontSize: "11px", margin: "2px 0" }}>
          Av Mani MZ 806 LT 11 Pedregal de San Nicolas, Tlapan, CDMX
        </p>
        <p
          class="centrado"
          style={{
            margin: "8px 0 0  ",
            fontSize: "13px",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          TICKET N.º {ticket_id}
        </p>
        {/* <p class="centrado">Servicio a domicilio</p> */}
        <p class="centrado" style={{ fontSize: "11px", margin: "0px 0" }}>
          Fecha:{" "}
          {moment(
            new window.Date(saleInfo?.created_at?.seconds * 1000).toJSON()
          ).format("L")}
          {/* <br />
          Hora:{" "}
          {moment(
            new window.Date(saleInfo?.created_at?.seconds * 1000).toJSON()
          ).format("HH:mm a")} */}
        </p>
        <hr />
      </p>
      <div class="grid" style={{ marginBottom: "5px" }}>
        {/* <div>
          <p style={{ fontSize: "11px" }}>CANT</p>
        </div> */}
        <div>
          <p style={{ fontSize: "11px" }}>PRODUCTO</p>
        </div>
        <div>
          <p style={{ fontSize: "11px" }}>PRECIO</p>
        </div>
      </div>
      <div>
        {saleInfo?.products?.map((product) => (
          <div class="grid" style={{ marginBottom: "10px" }}>
            {/* <div>
              <p style={{ fontSize: "11px" }}>{product.purchased_amount}</p>
            </div> */}
            <div>
              <p style={{ fontSize: "11px" }}>
                {product.purchased_amount} x {product.name}
              </p>
            </div>
            <div>
              <p style={{ fontSize: "11px" }}>${product.total_price}</p>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div style={{ textAlign: "right" }}>
        <strong>
          <p style={{ marginBottom: "10px", fontSize: "12px" }}>
            TOTAL: ${saleInfo?.info?.totalPriceSell?.toFixed(2)}
          </p>
        </strong>
        {/* <p style={{ fontSize: "11px" }}>
          EFECTIVO: ${saleInfo?.info?.entryOfSale}
        </p>
        <p style={{ fontSize: "11px" }}>
          CAMBIO: ${saleInfo?.info?.changeOfSale}
        </p> */}
      </div>
      <hr />
      <div style={{ marginTop: "10px", fontSize: "11px" }}>
        <p class="centrado">¡GRACIAS POR SU COMPRA!</p>
      </div>
      <br />
      <br />
    </div>
  );
};
