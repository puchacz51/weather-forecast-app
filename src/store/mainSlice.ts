import { StateCreator, create } from 'zustand';
import { City } from '../utilities/type';
import {
  getSearchHistory,
  setSearchHistory,
} from '../utilities/getSearchHistory';
import { Main } from '../WeatherTypes';
import { RootStore } from './store';

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
export type MainStore = State & Actions;
export const useMainStore: StateCreator<RootStore, [], [], MainStore> = (
  set
) => ({
  theme: 'LIGHT',
  selectedCity: null,
  selectedCardType: 'CURRENT',
  headerInputIsOpen: false,
  headerInputText: '',
  changeUserWeatherCardIsOpen: false,
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
      return { ...state, searchHistory: newSearchHistory };
    });
    (isOpen: boolean) => {
      set((state) => ({ ...state, changeUserWeatherCardIsOpen: isOpen }));
    };
  },
});
