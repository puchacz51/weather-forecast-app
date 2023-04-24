import { StateCreator, create } from 'zustand';
import { RootStore } from './store';
type State = {
  changeUserWeatherCardIsOpen: boolean;
};
type Actions = {
  setChangeUserWeatherCardIsOpen: (isOpen: boolean) => void;
};

export type DashBoardStore = State & Actions;

export const useDashboardStore: StateCreator<
  RootStore,
  [],
  [],
  DashBoardStore
> = (set) => ({
  changeUserWeatherCardIsOpen: false,
  setChangeUserWeatherCardIsOpen: (isOpen) =>
    set((state) => ({ ...state, changeUserWeatherCardIsOpem: isOpen })),
});
