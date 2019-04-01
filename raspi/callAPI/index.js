const CALL_API =  require('./call_api');
const device   =  {id: process.env.DEVICE_ID, password: process.env.DEVICE_PASSWORD}

const callAPI = (barcode) => {
  if(barcode.length<6) return false;
  console.log(`barcode: <${barcode}>`);
  CALL_API('post', `/device/scan/${barcode}`, device).then((cb) => {
    console.log(cb);  
  }).catch((e) => {
	if(e.response)
    	console.log(`scan failed: ${e.response.data}`);
    else
		console.log(`API not availble on localhost`);
  })
}

module.exports = callAPI;
