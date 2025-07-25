import styled from "styled-components";
import { deleteProductOfStock } from "../../api/stock";
import { toastModel } from "../../utils/toast";
import { useStockStore } from "../../store";
import { Toaster, toast } from "sonner";

const Card = styled.div`
  display: grid;
  grid-template-columns: 35% 17% 17% 15% 11%;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-items: center;
  justify-items: flex-start;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 15px 10px 15px 30px;
  & div {
    & img {
      width: 44px;
      height: 44px;
    }
    & p {
      margin: 0;
      font-family: "Poppins";
      font-size: 14px;
      color: #000;
    }
    & span {
      margin: 0;
      font-family: "Jost";
      color: #4b88ee;
      font-size: 14px;
      cursor: pointer;
    }
  }
`;

export const ProductCard = ({ product, productEdit, key }) => {
  // Store
  const stock = useStockStore((state) => state.stock);
  const setStock = useStockStore((state) => state.setStock);

  const deleteProductHandler = (uuid) => {
    deleteProductOfStock(uuid)
      .then(() => {
        toast.success("Producto Eliminado!", {
          ...toastModel,
        });
        const new_stock = stock.filter((product) => product.uuid !== uuid);
        setStock(new_stock);
      })
      .catch(() => {
        toast.error("Ocurrio un error, intentalo más tarde!", {
          ...toastModel,
        });
      });
  };

  return (
    <Card key={product.name}>
      <div>
        <p>{product.name}</p>
      </div>
      <div>
        <p>${product.sell_price}</p>
      </div>
      <div>
        <p>
          {product.stock} {product.unit_measure}
        </p>
      </div>
      <div>
        <span onClick={() => productEdit(product)}>Editar</span>
      </div>
      <div>
        <span
          style={{ color: "red" }}
          onClick={() => deleteProductHandler(product.uuid)}
        >
          Eliminar
        </span>
      </div>
      <Toaster position="bottom-right" />
    </Card>
  );
};
