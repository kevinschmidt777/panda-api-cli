#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import inquirer from "inquirer";
import fs from "fs";
import https from "https";
// @ts-ignore
import download from "download-git-repo";

// Constants
const gitHubRepo = "kevinschmidt777/stay-focused";

// Introduction
clear();
console.log(
  chalk.green(figlet.textSync("Panda API", { horizontalLayout: "full" }))
);
console.log(chalk.white("version 1.0.0 - https://... \n"));
console.log(
  chalk.yellow(
    "Welcome to the Panda API CLI. Let's get started! This CLI will help you create a new Panda API project."
  )
);

const setup = async () => {
  const answers = await inquirer.prompt([
    {
      name: "name",
      message: "What is the name of your project?",
      default: "my-fancy-panda-api",
    },
    {
      type: "list",
      name: "database",
      message: "What database do you want to use?",
      choices: ["MongoDB", "PostgreSQL", "MySQL", "SQLite", "MariaDB"],
    },
    {
      type: "checkbox",
      name: "features",
      message: "What features do you want to include?",
      choices: ["Authentication"],
    },
  ]);

  console.log(answers);

  download(gitHubRepo, "./test", function (err: any) {
    console.log(err ? "Error" : "Success");
  });
};

// Start process
setup();
