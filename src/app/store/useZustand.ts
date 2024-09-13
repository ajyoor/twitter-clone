import { create } from "zustand";

interface type {
  showModal: boolean;
  setShowModal: () => void;
  accountUser: any;
  setAccountUser: (datas: any) => void;
}

const useZustand = create<type>((set) => ({
  // modal
  showModal: false,
  setShowModal: () => set((state) => ({ showModal: !state.showModal })),
  // account
  accountUser: {},
  setAccountUser: (datas) => set({ accountUser: datas }),
}));

export default useZustand;
