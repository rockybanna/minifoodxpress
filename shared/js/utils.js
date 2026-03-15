export function formatCurrency(amount) {
  return "₹" + amount.toFixed(2)
}

export function formatTime(minutes) {
  return minutes + " min"
}

export function showLoader(id) {
  document.getElementById(id).style.display = "block"
}

export function hideLoader(id) {
  document.getElementById(id).style.display = "none"
}
