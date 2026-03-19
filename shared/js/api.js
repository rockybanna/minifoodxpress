import { supabase } from "./supabase-client.js"
import { CONFIG } from "./config.js"

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
  const { data, error } = await supabase.auth.getUser()
  return { user: data?.user || null, error }
}

/* ===============================
   RESTAURANTS
================================ */

export async function getRestaurants() {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("status", "active")

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
    .eq("is_available", true)

  return { data, error }
}

/* ===============================
   ORDERS
================================ */

export async function createOrder(orderData) {
  const { data, error } = await supabase
    .from("orders")
    .insert({
      ...orderData,
      status: "payment_pending"
    })
    .select()
    .single()

  return { data, error }
}

export async function getOrdersByCustomer(customerId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false })

  return { data, error }
}

export async function getOrderById(orderId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single()

  return { data, error }
}

/* ===============================
   PAYMENT
================================ */

export async function uploadPaymentProof(file, orderId) {
  const filePath = `proof_${orderId}.jpg`

  const { error: uploadError } = await supabase.storage
    .from(CONFIG.BUCKETS.PAYMENT_PROOFS)
    .upload(filePath, file, { upsert: true })

  if (uploadError) return { error: uploadError }

  const { data } = supabase.storage
    .from(CONFIG.BUCKETS.PAYMENT_PROOFS)
    .getPublicUrl(filePath)

  return { url: data.publicUrl }
}

export async function createPaymentEntry({
  order_id,
  proof_image_url,
  payer_name,
  payer_upi_id,
  expected_amount
}) {
  const { data, error } = await supabase
    .from("payments")
    .insert({
      order_id,
      proof_image_url,
      payer_name,
      payer_upi_id,
      expected_amount,
      verification_status: "verification_pending"
    })
    .select()
    .single()

  return { data, error }
}

/* ===============================
   VERIFIER ACTIONS
================================ */

export async function verifyPayment(paymentId, verifierId) {
  const { data, error } = await supabase
    .from("payments")
    .update({
      verification_status: "verified",
      verified_by: verifierId
    })
    .eq("id", paymentId)
    .select()

  return { data, error }
}

export async function rejectPayment(paymentId, verifierId) {
  const { data, error } = await supabase
    .from("payments")
    .update({
      verification_status: "rejected",
      rejected_by: verifierId
    })
    .eq("id", paymentId)
    .select()

  return { data, error }
}

export async function uploadRefundProof(file, orderId) {
  const filePath = `refund_${orderId}.jpg`

  const { error: uploadError } = await supabase.storage
    .from(CONFIG.BUCKETS.REFUND_PROOFS)
    .upload(filePath, file, { upsert: true })

  if (uploadError) return { error: uploadError }

  const { data } = supabase.storage
    .from(CONFIG.BUCKETS.REFUND_PROOFS)
    .getPublicUrl(filePath)

  return { url: data.publicUrl }
}

export async function markRefunded(paymentId, verifierId, refundUrl) {
  const { data, error } = await supabase
    .from("payments")
    .update({
      verification_status: "refunded",
      refunded_by: verifierId,
      refund_proof_url: refundUrl,
      refunded_at: new Date().toISOString()
    })
    .eq("id", paymentId)
    .select()

  return { data, error }
}

/* ===============================
   SETTINGS
================================ */

export async function getSetting(key) {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", key)
    .single()

  return { value: data?.value, error }
}
