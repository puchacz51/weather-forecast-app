import { Session } from '@supabase/supabase-js';
import { StateCreator, create } from 'zustand';
import { Database } from '../utilities/supabase/schema';
import { RootStore } from './store';

type State = {
  session: Session | null;
  loading: boolean;
  userWeatherCards: Database['public']['Tables']['weatherCard']['Row'][] | [];
};
type Actions = {
  setSession: (session: Session | null) => void;
  addNewWeatherCard: (
    setUserWeatherCards: Database['public']['Tables']['weatherCard']['Row']
  ) => void;
};

export type SessionStore = State & Actions;

export const useSessionStore: StateCreator<RootStore, [], [], SessionStore> = (
  set
) => ({
  session: null,
  loading: true,
  userWeatherCards: [],
  setSession(session) {
    set((state) => ({ ...state, session: session, loading: false }));
  },
  addNewWeatherCard(newWeatherCard) {
    set((state) => ({
      ...state,
      addNewWeatherCards: [...state.userWeatherCards, newWeatherCard],
    }));
  },
});
