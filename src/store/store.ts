import { create } from 'zustand';
import { City } from '../utilities/type';

type Store = {
  selectedCity: City | null;
  selectedCardType: 'CURRENT' | '5DAYS';
  headerInputIsOpen: boolean;
  headerInputText: string;
  theme: 'DARK' | 'LIGHT';
  setSelectedCity: (name: City) => void;
  setHeaderInputText: (text: string) => void;
  setHeaderInputIsOpen: (isOpen: boolean) => void;
  setSelectedWeatherType: (type: 'CURRENT' | '5DAYS') => void;
  setTheme: (theme: 'LIGHT' | 'DARK') => void;
};

export const useWaeatherStore = create<Store>((set) => ({
  theme: 'LIGHT',
  selectedCity: null,
  selectedCardType: 'CURRENT',
  headerInputIsOpen: false,
  headerInputText: '',

  setSelectedCity(name) {
    set((state) => ({
      ...state,
      selectedCity: name,
      headerInputIsOpen: false,
    }));
  },
  setHeaderInputText(text) {
    set((state) => ({ ...state, headerInputText: text }));
  },
  setHeaderInputIsOpen(isOpen) {
    set((state) => ({
      ...state,
      headerInputIsOpen: isOpen,
      headerInputText: '',
    }));
  },
  setSelectedWeatherType(type: 'CURRENT' | '5DAYS') {
    set((state) => ({ ...state, selectedCardType: type }));
  },
  setTheme(theme) {
    set((state) => ({ ...state, theme: theme }));
  },
}));
