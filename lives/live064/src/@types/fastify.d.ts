import { OrganizationRole } from "@prisma/client";
import "fastify";

declare module "fastify" {
  type OrganizationUser = {
    userId: string;
    organizationId: string;
    role: OrganizationRole;
  }

  interface FastifyRequest {
    organizationUser: OrganizationUser
  }
}
