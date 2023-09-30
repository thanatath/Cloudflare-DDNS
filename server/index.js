// Require the framework and instantiate it
require('dotenv').config();
const fastify = require("fastify")({ logger: false });
const fastifyEnv = require("@fastify/env");
fastify.register(fastifyEnv, require("./config/env"));
// Declare a route
fastify.register(require("./routes/api"));

fastify.register(require("@fastify/cors"), {
  origin: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Accept",
    "Content-Type",
    "Authorization",
  ],
  methods: ["GET", "PUT", "OPTIONS", "POST", "DELETE"],
});

// Run the server!
fastify.listen({port:process.env.PORT,host: "0.0.0.0"}, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening port ${process.env.PORT}`);
  console.log(
    "apiUrl: " +
      process.env.CLOUDFLARE +
      "\napiKey: " +
      process.env.TOKEN +
      "\nauthEmail: " +
      process.env.EMAIL
  );
});
