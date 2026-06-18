import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const HAS_SUPABASE = !!(supabaseUrl && supabaseAnonKey);

// Inizializza il client solo se le chiavi sono presenti, altrimenti crea un mock
export const supabase = HAS_SUPABASE 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
