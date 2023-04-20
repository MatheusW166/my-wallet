function formatMoney(value) {
  if (!value) return "";
  return value.toFixed(2).replace(".", ",");
}

export { formatMoney };
