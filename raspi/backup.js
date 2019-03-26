const usb = require('usb');
const { StringDecoder } = require('string_decoder');

let devices = usb.getDeviceList();
let device  = devices[0];
device.open(true);                                // open device
device.interfaces[0].claim();                    // claim interface

let endpoint = device.interfaces[0].endpoints[0];


endpoint.startPoll(1,8);
let barcode = '';
endpoint.on("data", function(dataBuf){
  //console.log(dataBuf);
  let dataArr = Array.prototype.slice.call(new Uint8Array(dataBuf, 0, 8)); // convert buffer to array
  let byte = dataArr[2];
  if(byte===0)
    return false;
  if(byte===40)
    callAPI(barcode);

  let digit = (byte - 29) % 10;
  barcode += digit.toString();
});