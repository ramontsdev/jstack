import { FastifyReply, FastifyRequest } from "fastify";
import { OrganizationsRepository } from "../../repositories/OrganizationsRepository";

export class ListUserOrgsController {
  constructor(private readonly organizationsRepository: OrganizationsRepository) { }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub: userId } = request.user;

    const organizations = await this.organizationsRepository.findOrgsByUserId(userId);

    return {
      organizations
    }
  }
}
