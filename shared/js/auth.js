import { supabase } from "./supabase-client.js"
import { CONFIG } from "./config.js"

/* ===============================
   LOGIN
================================ */

export async function loginAndRedirect(email, password){

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if(error){
    alert(error.message)
    return
  }

  const user = data.user

  if(!user){
    alert("Login failed")
    return
  }

  // 🔥 GET ROLE
  const { data:roleData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single()

  const role = roleData?.role

  if(!role){
    alert("Role not found")
    return
  }

  // 🔥 REDIRECT BASED ON ROLE
  switch(role){

    case "customer":
      window.location.href = CONFIG.ROUTES.CUSTOMER_HOME
      break

    case "restaurant":
      window.location.href = "/apps/restaurant-app/dashboard.html"
      break

    case "delivery_partner":
      window.location.href = "/apps/delivery-partner-app/dashboard.html"
      break

    case "verifier":
      window.location.href = "/apps/verifier-app/dashboard.html"
      break

    case "admin":
      window.location.href = "/admin-panel/dashboard.html"
      break

    default:
      alert("Invalid role")
  }
}

/* ===============================
   SIGNUP (CUSTOMER)
================================ */

export async function signupCustomer(email, password){

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role: "customer" }
    }
  })

  if(error){
    alert(error.message)
    return
  }

  alert("Signup successful. Please login.")
}

/* ===============================
   LOGOUT
================================ */

export async function logoutUser(){
  await supabase.auth.signOut()
  window.location.href = CONFIG.ROUTES.CUSTOMER_LOGIN
}
