import fastifyJwt from "@fastify/jwt";
import Fastify from "fastify";
import { ZodError } from "zod";
import { routes } from "./routes";

const fastify = Fastify();

fastify.register(routes);
fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
  sign: { expiresIn: "12h" },
})

fastify.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ errors: error.issues });
  }

  console.error(error);
  return reply.status(500).send({ message: "Internal server error" });
});

fastify
  .listen({ port: 3001 })
  .then(() => console.log("Server is running on port http://localhost:3001"));
