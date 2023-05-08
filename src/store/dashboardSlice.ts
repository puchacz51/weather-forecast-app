import { StateCreator, create } from 'zustand';
import { RootStore } from './store';
type State = {
  changeUserWeatherCardIsOpen: boolean;
  addFormIsOpen: boolean;
};
type Actions = {
  setChangeUserWeatherCardIsOpen: (isOpen: boolean) => void;
  toggleChangeUserWeatherCardIsOpen: () => void;
  setAddFormIsOpen: (isOpen: boolean) => void;
};

export type DashBoardStore = State & Actions;

export const useDashboardStore: StateCreator<
  RootStore,
  [],
  [],
  DashBoardStore
> = (set) => ({
  changeUserWeatherCardIsOpen: false,
  addFormIsOpen: false,
  setChangeUserWeatherCardIsOpen: (isOpen) =>
    set((state) => ({ ...state, changeUserWeatherCardIsOpem: isOpen })),
  toggleChangeUserWeatherCardIsOpen: () =>
    set((state) => {
      return {
        ...state,
        changeUserWeatherCardIsOpen: !state.changeUserWeatherCardIsOpen,
      };
    }),
  setAddFormIsOpen: (isOpen) => {
    set((state) => {
      return { ...state, addFormIsOpen: isOpen };
    });
  },
});
