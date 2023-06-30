import chalk from "chalk";
import ora from "ora";
import fs from "fs";
import { controllerTemplate } from "./fileTemplates/controller";
import { routeTemplate } from "./fileTemplates/route";
import { schemaTemplate } from "./fileTemplates/schema";

export const controller = async (
  pandaApiOpenerText: string,
  controllerName: string
) => {
  console.log(pandaApiOpenerText);

  const spinner = ora({
    text: `Generating new controller "${controllerName}"...`,
    color: "blue",
  });

  try {
    spinner.start();

    // Define things.
    const controllerFolder = "./controller";
    const routesFolder = "./routes";
    const newController = `${controllerFolder}/${controllerName}.ts`;
    const newRoute = `${routesFolder}/${controllerName}/routes.ts`;
    const newRouteSchema = `${routesFolder}/${controllerName}/schema.ts`;
    const updateRouteIndex = `${routesFolder}/index.ts`;
    const updateControllerIndex = `${controllerFolder}/index.ts`;

    // Generate folders if they don't exist.
    if (!fs.existsSync(controllerFolder))
      fs.mkdirSync(controllerFolder, { recursive: true });
    if (!fs.existsSync(`${routesFolder}/${controllerName}`))
      fs.mkdirSync(`${routesFolder}/${controllerName}`, { recursive: true });

    // Generate new files and write into it.
    fs.writeFileSync(newController, controllerTemplate(controllerName));
    fs.writeFileSync(newRoute, routeTemplate(controllerName));
    fs.writeFileSync(newRouteSchema, schemaTemplate(controllerName));

    // Update index files.
    fs.appendFileSync(
      updateRouteIndex,
      `export * from "./${controllerName}/routes";\nexport * from "./${controllerName}/schema";\n`
    );
    fs.appendFileSync(
      updateControllerIndex,
      `export * from "./${controllerName}";\n`
    );

    // Regsiter routes at server index.
    fs.appendFileSync(
      "./index.ts",
      `server.register(routes.${controllerName}Routes);\n`
    );
  } catch (error) {
    console.log(chalk.red(error));
  } finally {
    spinner.stop();
    // Done!
    console.log(
      chalk.green(
        `New controller "${controllerName}", it's routes and schema was generated successfully!`
      )
    );
  }
};
