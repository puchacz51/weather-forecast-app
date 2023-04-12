import { create } from 'zustand';
import { City } from '../utilities/type';
import { supabase } from '../utilities/supabase/supabase';
import {
  getSearchHistory,
  setSearchHistory,
} from '../utilities/getSearchHistory';

type State = {
  selectedCity: City | null;
  selectedCardType: 'CURRENT' | '5DAYS';
  headerInputIsOpen: boolean;
  headerInputText: string;
  theme: 'DARK' | 'LIGHT';
  searchHistory: City[] | [];
};
type Actions = {
  setSelectedCity: (name: City) => void;
  setHeaderInputText: (text: string) => void;
  setHeaderInputIsOpen: (isOpen: boolean) => void;
  setSelectedWeatherType: (type: 'CURRENT' | '5DAYS') => void;
  setTheme: (theme: 'LIGHT' | 'DARK') => void;
  setSearchHistory: (newSearch: City) => void;
};

type Store = State & Actions;

export const useWaeatherStore = create<Store>((set) => ({
  theme: 'LIGHT',
  selectedCity: null,
  selectedCardType: 'CURRENT',
  headerInputIsOpen: false,
  headerInputText: '',
  searchHistory: getSearchHistory(),
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
  setSearchHistory: (newSearch: City) => {
    set((state) => {
      let newSearchHistory = state.searchHistory.filter(
        (city) => city.id !== newSearch.id
      );
      newSearchHistory = [newSearch, ...newSearchHistory];
      newSearchHistory.length > 5 && newSearchHistory.pop();
      setSearchHistory(newSearchHistory);
      newSearchHistory.forEach((city) => {
        console.log(city.id);
      });
      return { ...state, searchHistory: newSearchHistory };
    });
  },
}));
