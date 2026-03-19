export const CONFIG = {

  // 🟢 APP
  APP_NAME: "MiniFoodXpress",

  // 🟢 SUPABASE
  SUPABASE_URL: "https://uouwizrknwrqqynodplv.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvdXdpenJrbndycXF5bm9kcGx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNDk1MjksImV4cCI6MjA4ODYyNTUyOX0.oxDZqaT1bMed6uuirN2ZoDCambPYLhOHp2PlhX8gaco",

  // 🟢 ORDER RULES
  MIN_ORDER_AMOUNT: 149,
  MAX_ORDER_AMOUNT: 5000,

  // 🟢 DELIVERY RULES (SYNC WITH DB)
  BASE_DELIVERY_PER_KM: 12,
  BASE_DELIVERY_FIXED: 20,
  MIN_DELIVERY_CHARGE: 36,
  MAX_DELIVERY_DISTANCE_KM: 20,

  // 🟢 DP RULES (FINAL LOCKED)
  MAX_ACTIVE_ORDERS_PER_DP: 1,
  MAX_WAITING_ORDERS_PER_DP: 1,

  // 🟢 DP PAYOUT
  DP_RATE_PER_KM: 10,

  // 🟢 OFFER (FINAL LOCKED)
  OFFER_ENABLED: true,
  OFFER_PERCENT: 5,
  OFFER_THRESHOLD: 199,

  // 🟢 SURGE
  SURGE_ENABLED: true,

  // 🟢 STORAGE BUCKETS (IMPORTANT)
  BUCKETS: {
    PAYMENT_PROOFS: "payment_proofs",
    REFUND_PROOFS: "payout_proofs",
    QR_CODES: "refund_qr_codes",
    ITEM_IMAGES: "item_images",
    RESTAURANT_LOGOS: "restaurant_logos"
  },

  // 🟢 ROUTES (FOR ALL APPS)
  ROUTES: {
    CUSTOMER_LOGIN: "/apps/customer-app/login.html",
    CUSTOMER_HOME: "/apps/customer-app/home.html",

    RESTAURANT_LOGIN: "/apps/restaurant-app/login.html",
    DELIVERY_LOGIN: "/apps/delivery-partner-app/login.html",
    VERIFIER_LOGIN: "/apps/verifier-app/login.html",
    ADMIN_LOGIN: "/admin-panel/login.html"
  }

};
