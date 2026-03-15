import { supabase } from "./supabase-client.js"

/*
FoodXpress Global Router
Routes users to correct app based on role
*/

export async function routeUser() {

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error("Auth error:", error)
    return
  }

  const user = data.user

  if (!user) {
    // Not logged in
    window.location.href = "/customer-app/"
    return
  }

  const role = user.user_metadata?.role

  switch (role) {

    case "admin":
      window.location.href = "/admin-panel/"
      break

    case "restaurant":
      window.location.href = "/restaurant-app/"
      break

    case "delivery_partner":
      window.location.href = "/delivery-partner-app/"
      break

    case "verifier":
      window.location.href = "/verifier-app/"
      break

    case "customer":
      window.location.href = "/customer-app/"
      break

    default:
      console.warn("Unknown role:", role)
      window.location.href = "/customer-app/"
  }

}
