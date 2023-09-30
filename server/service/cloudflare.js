require('dotenv').config();
async function getIdZoneFromDomain(fastify) {
  const headers = {
    "X-Auth-Key": process.env.TOKEN,
    "X-Auth-Email": process.env.EMAIL,
    "Content-Type": "application/json",
  };
  const path = process.env.CLOUDFLARE;

  // Check it's has cache

  const idZoneCached = fastify.cache.get("idZone");

  if (idZoneCached) return idZoneCached;

  const res = await fetch(path, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

  const domainID = res.result.find((x) => (x.name = process.env.DOMAIN)).id;
  fastify.cache.set("idZone", domainID);
  return domainID;
}

////////////////////////////////////////////////////////////////////////

async function getDomainIdFromZone(fastify, subDomain) {
  const headers = {
    "X-Auth-Key": process.env.TOKEN,
    "X-Auth-Email": process.env.EMAIL,
    "Content-Type": "application/json",
  };

  const idZoneCached = fastify.cache.get("idZone");
  const domainIDCached = fastify.cache.get(subDomain);

  if (domainIDCached) {
    return domainIDCached;
  }

  var domainID = "";
  var idZone = "";

  if (!idZoneCached) {
    var idZone = await getIdZoneFromDomain(fastify);
  } else {
    idZone = idZoneCached;
  }

  const path = `${process.env.CLOUDFLARE}${idZone}/dns_records`;

  const res = await fetch(path, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

  domainID = res.result.find((x) => (x.name = subDomain)).id;
  fastify.cache.set(subDomain, domainID);

  return domainID;
}

////////////////////////////////////////////////////////////////////////

async function updateDomainIdFromZone(fastify, detail) {
  const headers = {
    "X-Auth-Key": process.env.TOKEN,
    "X-Auth-Email": process.env.EMAIL,
    "Content-Type": "application/json",
  };

  const idZone = await getIdZoneFromDomain(fastify);
  const idDomain = await getDomainIdFromZone(fastify, detail.domain);

  const data = {
    content: detail.ip,
    name: detail.domain,
    type: detail.ipv.toString() == 6 ? "AAAA" : "A",
    ttl: 3600,
  };

  const path = `${process.env.CLOUDFLARE}${idZone}/dns_records/${idDomain}`;

  const res = await fetch(path, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

  const domainID = res.success;
  console.log(`Update ${detail.domain} to ${detail.ip} At ${new Date(new Date().toLocaleString({timeZone: process.env.TZ}))} OK`);
  return domainID;
}

module.exports = {
  getDomainIdFromZone,
  getIdZoneFromDomain,
  updateDomainIdFromZone,
};
