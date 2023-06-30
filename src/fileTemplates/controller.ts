import { textToCapitalize, textToLowerCase } from "../utils";

export const controllerTemplate = (controllerName: string) => {
  const controllerNameCapitalized = textToCapitalize(controllerName);
  const controllerNameLowercase = textToLowerCase(controllerName);

  return `
    import { FastifyReply, FastifyRequest } from "fastify";
    import {
      IRouteGet${controllerNameCapitalized}Body,
      IRouteGet${controllerNameCapitalized}Headers,
      IRouteGet${controllerNameCapitalized}Params,
      IRouteGet${controllerNameCapitalized}Querystring,
    } from "../routes";
    
    export const ${controllerNameLowercase}Controller = async (
      request: FastifyRequest<{
        Headers: IRouteGet${controllerNameCapitalized}Headers;
        Querystring: IRouteGet${controllerNameCapitalized}Querystring;
        Params: IRouteGet${controllerNameCapitalized}Params;
        Body: IRouteGet${controllerNameCapitalized}Body;
      }>,
      reply: FastifyReply
    ) => {
      try {
        const message = request.query.message;
        return reply
          .code(200)
          .send(
            "Yay! Panda API is running. Oh, and by the way, the querystring message is: " +
        message ??
      'no message set.' +
        "
            }"
          );
      } catch (error) {
        return reply.status(500).send(error);
      }
    };
    `;
};
