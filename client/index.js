const loadIniFile = require("read-ini-file");
const path = require("path");

const fixture = path.join(__dirname, "config.ini");

var config = "";

async function readINIFile() {
  config = await loadIniFile.readIniFile(fixture);
  console.log(`CONFIG: ${JSON.stringify(config)}`);
}

async function pushAPI(ip) {
  const url = config.ENDPOINT;

  const data = {
    subDomain: config.SUBDOMAIN,
    ipv: config.IPV,
    ip: ip,
  };

  console.log(`Detail to update : ${JSON.stringify(data)}`);

  const headers = {
    "Content-Type": "application/json",
  };

  await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((responseData) => {
      console.log("Response:", responseData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function fetchIP() {
  var url;
  if (config.IPV == 4) {
    url = "https://api4.ipify.org/?format=json";
  } else {
    url = "https://api64.ipify.org/?format=json";
  }

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      const ipv6Address = data.ip;
      console.log("IP Address:", ipv6Address);
      return ipv6Address;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function main() {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  await readINIFile();
  while (true) {
    console.log(new Date(new Date().toLocaleString({timeZone:config.TZ})));
    const ip = await fetchIP();
    await pushAPI(await ip);
    await timer(config.INTAVAL*1000);
  }
}

main();
