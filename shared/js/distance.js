/* =====================================
   DISTANCE + PRICING ENGINE (FINAL)
   - Haversine distance
   - Delivery calculation
   - Offer logic
   - Surge support
===================================== */

import { CONFIG } from "./config.js";

/* ===============================
   HAVERSINE DISTANCE
================================ */

export function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/* ===============================
   DELIVERY CALCULATION
================================ */

export function calculateDelivery(distance) {
  if (distance > CONFIG.MAX_DELIVERY_DISTANCE_KM) {
    return { error: "Delivery not available" };
  }

  let multiplier = 1;

  if (distance <= 5) multiplier = 1.5;
  else if (distance <= 10) multiplier = 1.3;
  else multiplier = 1.2;

  const adjustedDistance = distance * multiplier;

  let delivery =
    CONFIG.BASE_DELIVERY_FIXED +
    adjustedDistance * CONFIG.BASE_DELIVERY_PER_KM;

  delivery = Math.round(delivery);

  if (delivery < CONFIG.MIN_DELIVERY_CHARGE) {
    delivery = CONFIG.MIN_DELIVERY_CHARGE;
  }

  return { delivery, adjustedDistance };
}

/* ===============================
   OFFER CALCULATION
================================ */

export function calculateOffer(subtotal, delivery) {
  if (!CONFIG.OFFER_ENABLED) return 0;

  if (subtotal <= CONFIG.OFFER_THRESHOLD) return 0;

  const discountBase = subtotal - CONFIG.OFFER_THRESHOLD;

  let discount = discountBase * (CONFIG.OFFER_PERCENT / 100);

  discount = Math.round(discount);

  const maxDiscount = delivery - 1;

  return Math.min(discount, maxDiscount);
}

/* ===============================
   FINAL ORDER CALCULATION
================================ */

export function calculateOrder({
  subtotal,
  restaurantFee = 0,
  lat1,
  lon1,
  lat2,
  lon2,
  surgeMultiplier = 1
}) {
  const distance = getDistanceKm(lat1, lon1, lat2, lon2);

  const deliveryData = calculateDelivery(distance);

  if (deliveryData.error) return { error: deliveryData.error };

  const delivery = deliveryData.delivery;

  const baseTotal = subtotal + delivery + restaurantFee;

  const discount = calculateOffer(subtotal, delivery);

  let finalTotal = (baseTotal - discount) * surgeMultiplier;

  finalTotal = Math.round(finalTotal);

  return {
    distance: Number(distance.toFixed(2)),
    delivery_charge: delivery,
    discount,
    final_total: finalTotal
  };
}
