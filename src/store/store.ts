import { create } from 'zustand';
import { MainStore, useMainStore } from './mainSlice';
import { SessionStore, useSessionStore } from './userStore';
import { DashBoardStore, useDashboardStore } from './dashboardSlice';

export type RootStore = MainStore & SessionStore & DashBoardStore;
// const main = useMainStore(set);
export const useRootStore = create<RootStore>((...a) => ({
  ...useMainStore(...a),
  ...useSessionStore(...a),
  ...useDashboardStore(...a),
}));
