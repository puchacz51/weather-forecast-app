import { create } from 'zustand';
type State = {
  changeUserWeatherCardIsOpen: boolean;
};
type Actions = {
  setChangeUserWeatherCardIsOpen: (isOpen: boolean) => void;
};

export type DashBoardStore = State & Actions;

export const useDashboardStore = create<DashBoardStore>((set) => ({
  changeUserWeatherCardIsOpen: false,
  setChangeUserWeatherCardIsOpen: (isOpen) =>
    set((state) => ({ ...state, changeUserWeatherCardIsOpem: isOpen })),
}));
