import { create } from 'zustand';
import { MainStore, useMainStore } from './mainSlice';
import { SessionStore, useSessionStore } from './userStore';
import { DashBoardStore, useDashboardStore } from './dashboardSlice';

type RootStore = {
  main: MainStore;
  session: SessionStore;
  dashboard: DashBoardStore;
};
// const main = useMainStore(set);
export const useRootStore = create<RootStore>((set) => ({
  main: useMainStore(set) ,
  session: useSessionStore(set),
  dashBoard: useDashboardStore(set),
}));
