import { ListOrgUsersController } from "../controllers/organizations/ListOrgUsersController";
import { makeOrganizationsRepository } from "./makeOrganizationsRepository";

export function makeListOrgUsersController(organizationId: string) {
  return new ListOrgUsersController(
    makeOrganizationsRepository(organizationId)
  );
}
