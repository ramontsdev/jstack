import { compare } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../../lib/db";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export class SignInController {
  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = schema.parse(request.body)

    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      }
    })

    if (!user) {
      return reply.code(401).send({ message: "Invalid credentials." })
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return reply.code(401).send({ message: "Invalid credentials." })
    }

    const accessToken = request.server.jwt.sign({
      sub: user.id
    });

    return reply.send({ accessToken })
  }
}
