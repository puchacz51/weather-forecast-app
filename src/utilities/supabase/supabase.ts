import { createClient } from '@supabase/supabase-js';
import { Database } from './schema';

export const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);
