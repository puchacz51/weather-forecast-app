import { supabase } from './supabase';
const getUrl = () => window.location.href;

export const singInWithGitHub = async () =>
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: getUrl() },
  });
export const singInWithGoogle = async () =>
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: getUrl() },
  });
