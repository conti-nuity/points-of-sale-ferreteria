import { create } from "zustand";

// Stock
export const useStockStore = create((set) => ({
  // State
  stock: [],
  //   Actions
  setStock: (info) => set(() => ({ stock: info })),
}));

// Sales
export const useSalesStore = create((set) => ({
  // State
  sales: [],
  //   Actions
  setSales: (info) => set(() => ({ sales: info })),
}));
