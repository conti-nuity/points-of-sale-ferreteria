import { db } from "../firebase";
import { getRandomArbitrary } from "../utils/funcitons";

export const addProducttoInventory = (dataForm, uuid) => {
  return new Promise((resolve, reject) => {
    db.collection("stock")
      .doc(`${uuid}`)
      .set({
        ...dataForm,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  });
};

export const updateProducttoInventory = (uuid, dataForm) => {
  return new Promise((resolve, reject) => {
    db.collection("stock")
      .doc(uuid)
      .update({
        ...dataForm,
        perfil_weight: parseFloat(dataForm.perfil_weight),
        price_sell_perfil_x_kilo: parseFloat(dataForm.price_sell_perfil_x_kilo),
        price_dealer_perfil_x_kilo: parseFloat(
          dataForm.price_dealer_perfil_x_kilo
        ),
        stock: parseFloat(dataForm.stock),
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  });
};

export const updateStock = (uuid, new_stock) => {
  return new Promise((resolve, reject) => {
    // Update
    let docRef = db.collection("stock").doc(uuid);

    db.runTransaction(function (transaction) {
      return transaction.get(docRef).then(function (doc) {
        const stock_updated = doc.data().stock;
        transaction.update(docRef, { stock: stock_updated + new_stock });
      });
    })

      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
        console.log(error);
      });
  });
};

export const getCosts = (star_date, end_date) => {
  return new Promise((resolve, reject) => {
    db.collection("costs")
      .where("created_at", ">", star_date)
      .where("created_at", "<", end_date)
      .onSnapshot((snap) => {
        let response = [];
        snap.forEach((doc) => {
          response.push({ ...doc.data() });
        });
        resolve(response);
      });
  });
};

export const getReport = (collection, star_date, end_date) => {
  return new Promise((resolve, reject) => {
    db.collection(collection)
      .where("created_at", ">", star_date)
      .where("created_at", "<", end_date)
      .onSnapshot((snap) => {
        let response = [];
        snap.forEach((doc) => {
          response.push({ ...doc.data() });
        });
        resolve(response);
      });
  });
};

export const getSales = (star_date, end_date) => {
  return new Promise((resolve, reject) => {
    console.log("Run get sales...");
    db.collection("sales")
      .where("created_at", ">", star_date)
      .where("created_at", "<", end_date)
      .onSnapshot((snap) => {
        let response = [];
        snap.forEach((doc) => {
          response.push({ ...doc.data() });
        });
        resolve(response);
      });
  });
};

export const getSale = (sale_id) => {
  return new Promise((resolve, reject) => {
    db.collection("sales")
      .doc(`${sale_id}`)
      .get()
      .then((res) => {
        resolve(res.data());
      });
  });
};

export const addCost = (dataForm) => {
  let uuid = getRandomArbitrary(2, 3000000);
  return new Promise((resolve, reject) => {
    db.collection("costs")
      .doc(`${uuid}`)
      .set({
        ...dataForm,
        created_at: new window.Date(),
        uuid,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteSale = (uuid) => {
  return new Promise((resolve, reject) => {
    db.collection("sales")
      .doc(`${uuid}`)
      .delete()
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
