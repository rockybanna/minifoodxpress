import { supabase } from "./supabase-client.js"

export async function checkAuth() {
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    window.location.href = "/"
  }

  return data.user
}

export async function requireRole(role) {
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    window.location.href = "/"
    return
  }

  const userRole = data.user.user_metadata.role

  if (userRole !== role) {
    alert("Unauthorized")
    window.location.href = "/"
  }
}
export async function login(email, password) {

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return null;
  }

  return data.user;

}
