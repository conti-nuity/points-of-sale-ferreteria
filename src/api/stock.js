import { db } from "../firebase";

export const getStock = () => {
  return new Promise((resolve) => {
    db.collection("stock").onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data() });
      });
      resolve(documents);
    });
  });
};

export const updateStock = (product) => {
  return new Promise((resolve, reject) => {
    console.log("Run change stock...");
    db.collection("stock")
      .doc(`${product.uuid}`)
      .update({
        stock: product.stock - product.quantityAdded,
      })
      .then(() => {
        resolve(product.uuid);
      })
      .catch((error) => {
        console.log("Error change stock...", error);
        reject(error);
      });
  });
};

export const deleteProductOfStock = (uuid) => {
  return new Promise((resolve, reject) => {
    db.collection("stock")
      .doc(`${uuid}`)
      .delete()
      .then(() => {
        resolve(uuid);
      })
      .catch((error) => {
        console.log("Error change stock...", error);
        reject(error);
      });
  });
};
