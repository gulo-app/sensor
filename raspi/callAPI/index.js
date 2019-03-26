const callAPI = (barcode) => {
  if(barcode.length<6) return false;
  console.log(`barcode: <${barcode}>`);
}

module.exports = callAPI;
