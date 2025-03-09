import { LeadsRepository } from "../repositories/LeadsRepository";

export function makeLeadsRepository(organizationId?: string) {
  return new LeadsRepository(organizationId);
}
