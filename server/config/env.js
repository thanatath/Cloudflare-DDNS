module.exports= {
    confKey: "config",
    dotenv: true,
    schema: {
      type: "object",
      required: ["TOKEN", "DOMAIN", "EMAIL","PORT"],
      properties: {
        TOKEN: {
          type: "string",
        },
        DOMAIN: {
          type: "string",
        },
        EMAIL: {
          type: "string",
        },
        TTL: {
          type: "string",
        },
        PORT: {
          type: "string",
          default: 3000
        },
      },
    },
    data: process.env
};
