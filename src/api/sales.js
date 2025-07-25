import { db } from "../firebase";

export const addSale = (uuid, sale) => {
  return new Promise((resolve, reject) => {
    console.log("Run add sale...", uuid);
    db.collection("sales")
      .doc(uuid)
      .set(sale)
      .then((res) => {
        resolve(uuid);
      })
      .catch((error) => {
        console.log("Error add sale...", error);
        reject(error);
      });
  });
};
