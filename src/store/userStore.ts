import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { Database } from '../utilities/supabase/schema';

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

export const useSessionStore = create<SessionStore>((set) => ({
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
}));
