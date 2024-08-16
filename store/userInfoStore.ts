import { create } from "zustand";

import { User } from "@/services/types";

const useStore = create(set => ({
  userInfo: {},
  setUserInfo: (userInfo: User) => set({ userInfo }),
}));

export default useStore;
