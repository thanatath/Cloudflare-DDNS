module.exports = {
  ipSchema: {
    schema: {
      body: {
        type: "object",
        properties: {
          subDomain: { type: "string" },
          ipv: { type: "number" },
          ip: { type: "string" },
        },
        required: ["subDomain", "ipv", "ip"],
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
