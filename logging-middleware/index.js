const axios = require("axios");
const URL = "http://20.207.122.201/evaluation-service/logs";
let token = process.env.tokn;

function setToken(t) {
  token = t;
}
async function logEvent(stack, level, packageName, message) {
  const data = {
    stack,
    level,
    package: packageName,
    message
  };

  if (!token) {
    console.log(data);
    return;
  }
  try {
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;

  } catch (err) {
    console.log("Log failed");
  }
}

module.exports = {
  logEvent,
  setToken
};