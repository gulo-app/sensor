const axios = require('axios');

const URI = (process.env.NODE_ENV==='desktop') ? 'http://localhost:9001' : 'https://montv10.net:9400'; //https://gulo-service.herokuapp.com
console.log(URI);
const API_CALL = (verb, path, data) => {
  return new Promise((resolve, reject) => {
    let url = `${URI}${path}`;

    axios(`${URI}${path}`, {
      method: verb,
      withCredentials: true,
      data
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    })
  });
}

module.exports = API_CALL;
