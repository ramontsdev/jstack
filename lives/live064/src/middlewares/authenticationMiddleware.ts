import type { FastifyReply, FastifyRequest } from "fastify";

export async function authenticationMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.code(401).send({ message: "Invalid access token." });
  }
}
