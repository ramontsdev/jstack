import type { FastifyPluginAsync } from "fastify";
import { routeAdapter } from "../adapters/routeAdapter";
import { makeCreateLeadController } from "../factories/makeCreateLeadController";
import { makeListLeadsController } from "../factories/makeListLeadsController";
import { validatePermissionMiddleware } from "../middlewares/validatePermissionMiddleware";

export const leadsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook("onRequest", validatePermissionMiddleware());

  fastify.get("/", routeAdapter(makeListLeadsController));

  fastify.post(
    "/",
    { onRequest: [validatePermissionMiddleware(["ADMIN", "OWNER"])] },
    routeAdapter(makeCreateLeadController)
  )
};
