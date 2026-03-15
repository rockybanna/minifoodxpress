import { supabase } from "./supabase-client.js"
/* ===============================
   AUTH
================================ */

export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export async function logoutUser() {
  return await supabase.auth.signOut()
}

export async function getCurrentUser() {
  return await supabase.auth.getUser()
}

/* ===============================
   RESTAURANTS
================================ */

export async function getRestaurants() {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")

  return { data, error }
}

export async function getRestaurantById(id) {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", id)
    .single()

  return { data, error }
}

/* ===============================
   MENU
================================ */

export async function getMenuItems(restaurantId) {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("restaurant_id", restaurantId)

  return { data, error }
}

/* ===============================
   ORDERS
================================ */

export async function createOrder(orderData) {
  const { data, error } = await supabase
    .from("orders")
    .insert(orderData)
    .select()

  return { data, error }
}

export async function getOrdersByCustomer(customerId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_id", customerId)

  return { data, error }
}
