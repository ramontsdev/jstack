import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { IController } from "../../interfaces/IController";
import { LeadsRepository } from "../../repositories/LeadsRepository";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
});

export class CreateLeadController implements IController {
  constructor(private readonly leadsRepository: LeadsRepository) { }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, name, phone } = schema.parse(request.body);

    const lead = await this.leadsRepository.create({
      email,
      name,
      phone,
    });

    return reply.code(201).send({ lead });
  }
}
