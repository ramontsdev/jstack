import { db } from "../lib/db";

type CreateParams = {
  email: string;
  name: string;
  phone: string;
};

export class LeadsRepository {
  constructor(private readonly organizationId?: string) { }

  findAll() {
    return db.lead.findMany({
      where: { organizationId: this.organizationId },
    });
  }

  create({ email, name, phone }: CreateParams) {
    return db.lead.create({
      data: {
        email,
        name,
        phone,
        organizationId: this.organizationId!,
      }
    });
  }
}
