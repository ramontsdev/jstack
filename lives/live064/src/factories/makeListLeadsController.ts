import { ListLeadsController } from "../controllers/leads/ListLeadsController";
import { makeLeadsRepository } from "./makeLeadsRepository";

export function makeListLeadsController(organizationId?: string) {
  return new ListLeadsController(makeLeadsRepository(organizationId));
}
