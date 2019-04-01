const usb 		= 	require('usb');
const callAPI 	= 	require('../callAPI');
const DEVICE_ID =	process.env.DEVICE_ID;


const recieveData = () => {
  let devices = usb.getDeviceList();
  let device  = devices[0];


  device.open(true);                                // open device
  const deviceInterface = device.interfaces[0];

  if(process.env.NODE_ENV!=='desktop'){
    //sudo apt-get install build-essential libudev-dev
    let driverAttached = false;
    if (deviceInterface.isKernelDriverActive()) {
  	 	driverAttached = true;
  	   	deviceInterface.detachKernelDriver();
    }
  }

  deviceInterface.claim();
  let endpoint = deviceInterface.endpoints[0];
  endpoint.startPoll(1,8);
  let barcode = '';

  endpoint.on("data", function(dataBuf){
    let dataArr = Array.prototype.slice.call(new Uint8Array(dataBuf, 0, 8)); // convert buffer to array
    let byte = dataArr[2];
    //process.stdout.write(byte + ' ');

    if(byte<30 || byte>40)
      return false;

    if(byte===40){
      callAPI(barcode);
      barcode = '';
      console.log("waiting for scan...");
      return false;
    }

    let digit = (byte - 29) % 10;
    barcode += digit.toString();
  });

  console.log(`device<${DEVICE_ID}> is waiting for scan...`);

}

module.exports = recieveData;
