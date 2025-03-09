import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../../lib/db";

const schema = z.object({
  user: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  }),

  organization: z.object({
    name: z.string(),
  })
})


export class SignUpController {
  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { user, organization } = schema.parse(request.body)

    const userAlreadyExists = await db.user.findUnique({
      where: { email: user.email },
      select: { id: true }
    });

    if (userAlreadyExists) {
      return reply.code(409).send({ message: "This email is already in use." })
    }

    const hashedPassword = await hash(user.password, 12)

    const { id } = await db.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        organizations: {
          create: {
            role: "OWNER",
            organization: {
              create: {
                name: organization.name
              }
            }
          }
        }
      },
    })

    reply.code(201).send({ id })
  }
}
