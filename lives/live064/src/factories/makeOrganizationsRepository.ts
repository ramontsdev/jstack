import { OrganizationsRepository } from "../repositories/OrganizationsRepository";

export function makeOrganizationsRepository(tenantId?: string) {
  return new OrganizationsRepository(tenantId)
}
