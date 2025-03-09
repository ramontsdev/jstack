import { FastifyRequest } from "fastify";
import { IController } from "../../interfaces/IController";
import { LeadsRepository } from "../../repositories/LeadsRepository";

export class ListLeadsController implements IController {
  constructor(private readonly leadsRepository: LeadsRepository) { }

  async handle(request: FastifyRequest) {
    const leads = await this.leadsRepository.findAll();

    return {
      leads
    }
  }
}
