import { create } from 'zustand';
import { City } from '../utilities/type';

type Store = {
  selectedCity: City | null;
  selectedCardType: 'CURRENT' | '5DAYS';
  headerInputIsOpen: boolean;
  headerInputText: string;
  // currentweatherData: CurrentWeather | null;
  // fiveDaysWeatherData: FiveDaysWeather | null;
  setSelectedCity: (name: City) => void;
  setHeaderInputText: (text: string) => void;
  setHeaderInputIsOpen: (isOpen: boolean) => void;
  setSelectedWeatherType: (type: 'CURRENT' | '5DAYS') => void;
  // setCurrentWeatherData: (data: CurrentWeather) => void;
  // set5daysWeatherData: (data: FiveDaysWeather) => void;
  // setSelectedCardType: (selectedType: 'CURRENT' | '5DAYS') => void;
};

export const useWaeatherStore = create<Store>((set) => ({
  selectedCity: null,
  selectedCardType: 'CURRENT',
  headerInputIsOpen: false,
  headerInputText: '',
  // currentweatherData: null,
  // fiveDaysWeatherData: null,
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
  // set5daysWeatherData(data) {
  //   set((state) => ({
  //     ...state,
  //     selectedCardType: '5DAYS',
  //     fiveDaysWeatherData: data,
  //   }));
  // },
  // setCurrentWeatherData(data) {
  //   set((state) => ({
  //     ...state,
  //     selectedCardType: 'CURRENT',
  //     currentweatherDatas: data,
  //   }));
  // },
  // setSelectedCardType(selectedType) {
  //   set((state) => ({ ...state, selectedCardType: selectedType }));
  // },
}));
