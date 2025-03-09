import { FastifyReply, FastifyRequest } from "fastify";

export interface IController {
  handle(request: FastifyRequest, reply: FastifyReply): Promise<any>;
}
