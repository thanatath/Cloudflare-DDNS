module.exports = {
  ipSchema: {
    schema: {
      body: {
        type: "object",
        properties: {
          domain: { type: "string" },
          ipv: { type: "number" },
          ip: { type: "string" },
        },
        required: ["domain", "ipv", "ip"],
      },
      response: {
        200: {
          type: "object",
          properties: {
            success: { type: "boolean" },
          },
        },
      },
    },
  },
};
