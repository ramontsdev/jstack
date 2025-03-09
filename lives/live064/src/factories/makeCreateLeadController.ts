import { CreateLeadController } from "../controllers/leads/CreateLeadController";
import { makeLeadsRepository } from "./makeLeadsRepository";

export function makeCreateLeadController(organizationId: string) {
  return new CreateLeadController(makeLeadsRepository(organizationId));
}
