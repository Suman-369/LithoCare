import { createClient } from "@supabase/supabase-js";

// We require these variables to be present in the environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Missing Supabase environment variables.");
}

// Server-side only client with service role key to bypass RLS and perform admin operations.
// RLS policies are bypassed, so ALWAYS enforce authorization (e.g., checking clerk_user_id) 
// at the application layer before calling Supabase.
const isValidUrl = (url: string | undefined) => url && url.trim().startsWith("http");
const safeUrl = isValidUrl(supabaseUrl) ? supabaseUrl!.trim() : "https://placeholder.supabase.co";
const safeKey = supabaseServiceKey && supabaseServiceKey.trim().length > 0 ? supabaseServiceKey.trim() : "placeholder-key";

export const supabaseAdmin = createClient(
  safeUrl,
  safeKey,
  {
    auth: {
      persistSession: false,
    },
  }
);
