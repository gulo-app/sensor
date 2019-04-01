const CALL_API =  require('./call_api');
const device   =  {id: process.env.DEVICE_ID, password: process.env.DEVICE_PASSWORD}

const callAPI = (barcode) => {
  if(barcode.length<6) return false;
  CALL_API('post', `/device/scan/${barcode}`, device).then((cb) => {
    //console.log(cb);
    console.log(`barcode: <${barcode}>`);
  }).catch((e) => {
    console.log(`scan failed: ${e.response.data}`);
  })
}

module.exports = callAPI;
