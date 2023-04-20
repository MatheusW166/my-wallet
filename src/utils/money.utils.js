function formatMoney(value) {
  let vNumber = Number(value);
  if (isNaN(vNumber)) return "";
  vNumber = Math.abs(vNumber);
  return vNumber.toFixed(2).replace(".", ",");
}

export { formatMoney };
