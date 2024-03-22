import { User } from '@/services/types';
import { create } from 'zustand';

const useStore = create((set) => ({
  userInfo: {},
  setUserInfo: (userInfo: User) => set({ userInfo }),
}));

export default useStore;
