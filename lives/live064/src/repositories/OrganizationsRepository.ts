import { db } from "../lib/db";

export class OrganizationsRepository {
  constructor(private readonly organizationId?: string) { }

  findOrgsByUserId(userId: string) {
    return db.organizationUser.findMany({
      where: { userId },
      select: {
        role: true,
        organization: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });
  }

  findOrgUsers() {
    if (!this.organizationId) {
      throw new Error("Organization not found");
    }

    return db.organizationUser.findMany({
      where: { organizationId: this.organizationId },
      select: {
        role: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }
}
