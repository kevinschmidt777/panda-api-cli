#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";
import figlet from "figlet";
import { setup } from "./setup";
import { controller } from "./controller";

// Constants
const gitHubRepo = "kevinschmidt777/panda-api";
const pandaApiOpenerText = `${chalk.green(
  figlet.textSync("Panda API", { horizontalLayout: "full" })
)}\n${chalk.gray("https://... \n")}`;

// Define arguments
const program = new Command();
program
  .description(pandaApiOpenerText)
  .option("-setup", "setup a new project")
  .option("-controller <value>", "create a new controller")
  .parse(process.argv);
const options = program.opts();

// No arguments? Trigger commander help. Otherwise, do stuff.
if (!Object.keys(options).length) program.help();
else if (options.Setup) setup(pandaApiOpenerText, gitHubRepo);
else if (options.Controller) controller(pandaApiOpenerText, options.Controller);
