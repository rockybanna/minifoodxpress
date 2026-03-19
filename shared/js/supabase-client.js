import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { CONFIG } from "./config.js";

/**
 * Supabase Client (GLOBAL)
 * - Handles auth session persistence
 * - Works across all apps (customer, admin, dp, etc.)
 */

export const supabase = createClient(
  CONFIG.SUPABASE_URL,
  CONFIG.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

/**
 * Get current logged-in user
 */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

/**
 * Get current session
 */
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/**
 * Require login (redirect if not logged in)
 */
export async function requireAuth(redirect = "/apps/customer/login.html") {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = redirect;
  }
  return user;
}

/**
 * Logout user
 */
export async function logoutUser() {
  await supabase.auth.signOut();
  window.location.href = "/apps/customer/login.html";
}
