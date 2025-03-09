import { FastifyReply, FastifyRequest } from "fastify";
import { IController } from "../interfaces/IController";

export function routeAdapter(
  controllerFactory: (organizationId: string) => IController,
  withOrg?: true
): (request: FastifyRequest, reply: FastifyReply) => unknown;

export function routeAdapter(
  controllerFactory: () => IController,
  withOrg?: false
): (request: FastifyRequest, reply: FastifyReply) => unknown;

export function routeAdapter(
  controllerFactory: ((organizationId: string) => IController) | (() => IController),
  withOrg = true
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!withOrg) {
      const controller = (controllerFactory as () => IController)();
      return controller.handle(request, reply);
    }

    const organizationId = request.headers["x-org-id"];

    if ((!organizationId || typeof organizationId !== "string")) {
      return reply.status(403).send({ error: "Organization is missing" });
    }

    const controller = controllerFactory(organizationId);
    return controller.handle(request, reply);
  }
}
