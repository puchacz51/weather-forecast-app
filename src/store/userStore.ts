import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { supabase } from '../utilities/supabase/supabase';
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
const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) return null;
  return data.session;
};

export const useUserStore = create<State & Actions>((set) => ({
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
