import { supabase } from './supabase';

export const singInWithGitHub = async () =>
  await supabase.auth.signInWithOAuth({ provider: 'github' });
export const singInWithGoogle = async () =>
  await supabase.auth.signInWithOAuth({ provider: 'google',options:{}});
