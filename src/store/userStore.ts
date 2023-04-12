import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { supabase } from '../utilities/supabase/supabase';

type State = {
  session: Session | null;
  loading: boolean;
};
type Actions = {
  setSession: (session: Session | null) => void;
};
const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) return null;
  return data.session;
};

export const useUserStore = create<State & Actions>((set) => ({
  session: null,
  loading: true,
  setSession(session) {
    set((state) => ({ ...state, session: session, loading: false }));
  },
}));
