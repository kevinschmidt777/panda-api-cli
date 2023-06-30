import { textToLowerCase } from "../utils";

export const routeTemplate = (controllerName: string) => {
  const controllerNameLowercase = textToLowerCase(controllerName);

  return `
  import { FastifyInstance, FastifyPluginAsync } from "fastify";
  import { ${controllerNameLowercase}Controller } from "../../controller";
  
  /**
   * Panda API uses a routes.ts file in each route folder to register the routes for that folder.
   * Below you can see an example of how to set-up a simple get route and its controller.
   * The seperate schema file is used to define the types of the route. They are used inside of the controller as types.
   */
  
  export const ${controllerNameLowercase}Routes: FastifyPluginAsync = async (
    server: FastifyInstance
  ) => {
    server.get("/${controllerNameLowercase}/:id?", {}, ${controllerNameLowercase}Controller);
  };
  `;
};
