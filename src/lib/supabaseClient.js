import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  // Accessing environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL or Anon Key is missing from environment variables.");
  }

  // createBrowserClient is specifically for client-side interactions (like scoring)
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Export a singleton for easy use across the frontend
export const supabase = createClient();
