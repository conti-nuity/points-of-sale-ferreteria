import { db } from "../firebase";

export const addSale = (uuid, sales) => {
  console.log("uuid", uuid);
  console.log("sales", sales);
  return new Promise((resolve, reject) => {
    console.log("Run add sale...");
    db.collection("sales")
      .doc(uuid)
      .set({ sales: sales })
      .then((res) => {
        resolve(uuid);
      })
      .catch((error) => {
        console.log("Error add sale...", error);
        reject(error);
      });
  });
};
