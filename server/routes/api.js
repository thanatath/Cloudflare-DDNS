require("dotenv").config();
const cfService = require("../service/cloudflare");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: process.env.TTL });
const ipSchema = require("../schema/ipSchema");

async function apiRoute(fastify) {
  fastify.decorate("cache", cache);
  fastify.get("/api/id", async (request, reply) => {
    const res = await cfService.getIdZoneFromDomain(fastify);
    reply.code(200).send({ res: res });
  });
  fastify.get("/api/:zoneName", async (request, reply) => {
    const { zoneName } = request.params;
    const res = await cfService.getDomainIdFromZone(fastify, zoneName);
    reply.code(200).send({ res: res });
  });
  fastify.post("/api/update", ipSchema.ipSchema, async (request, reply) => {
    console.log(
      `${request.ip} update ${request.body.domain} to ${
        request.body.ip
      } At ${new Date(new Date().toLocaleString({ timeZone: process.env.TZ }))}`
    );
    const detail = {
      domain: request.body.domain,
      ip: request.body.ip,
      ipv: request.body.ipv,
    };
    const res = await cfService.updateDomainIdFromZone(fastify, detail);
    reply.code(200).send({ success: res });
  });
}

module.exports = apiRoute;
