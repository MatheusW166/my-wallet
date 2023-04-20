function formatMoney(value) {
  if (!value) return "";
  value = Math.abs(value);
  return value.toFixed(2).replace(".", ",");
}

export { formatMoney };
