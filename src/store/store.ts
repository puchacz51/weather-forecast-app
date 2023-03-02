import { create } from 'zustand';
import { City } from '../utilities/type';

type Store = {
  selectedCity: City | null;
  setSelectedCity: (name: City) => void;
};

export const useWaeatherStore = create<Store>((set) => ({
  selectedCity: null,
  setSelectedCity(name) {
    set((state) => ({ ...state, selectedCity: name }));
  },
}));
