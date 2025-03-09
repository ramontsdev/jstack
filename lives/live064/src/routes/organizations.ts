import type { FastifyPluginAsync } from "fastify";
import { routeAdapter } from "../adapters/routeAdapter";
import { makeListOrgUsersController } from "../factories/makeListOrgUsersController";
import { makeListUserOrgsController } from "../factories/makeListUserOrgsController";
import { validatePermissionMiddleware } from "../middlewares/validatePermissionMiddleware";

export const organizationsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/users",
    { onRequest: [validatePermissionMiddleware(["OWNER", "ADMIN"])] },
    routeAdapter(makeListOrgUsersController)
  );

  fastify.get("/", routeAdapter(makeListUserOrgsController, false));
};
