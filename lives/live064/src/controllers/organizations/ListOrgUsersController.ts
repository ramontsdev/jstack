import { OrganizationsRepository } from "../../repositories/OrganizationsRepository";

export class ListOrgUsersController {
  constructor(private readonly organizationRepository: OrganizationsRepository) { }

  async handle() {
    const users = await this.organizationRepository.findOrgUsers();

    return {
      users
    }
  }
}
