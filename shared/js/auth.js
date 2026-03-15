import { supabase } from "./config.js"

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
