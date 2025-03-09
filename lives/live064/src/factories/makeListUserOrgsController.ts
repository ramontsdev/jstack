import { ListUserOrgsController } from "../controllers/organizations/ListUserOrgsController";
import { makeOrganizationsRepository } from "./makeOrganizationsRepository";

export function makeListUserOrgsController() {
  return new ListUserOrgsController(makeOrganizationsRepository());
}
