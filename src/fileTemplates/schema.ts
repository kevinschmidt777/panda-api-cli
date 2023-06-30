import { textToCapitalize } from "../utils";

export const schemaTemplate = (controllerName: string) => {
  const controllerNameCapitalized = textToCapitalize(controllerName);

  return `
  export interface IRouteGet${controllerNameCapitalized}Headers {}
  
  export interface IRouteGet${controllerNameCapitalized}Querystring {
    message: string;
  }
  
  export interface IRouteGet${controllerNameCapitalized}Params {
    id: number;
  }
  
  export interface IRouteGet${controllerNameCapitalized}Body {}
  `;
};
