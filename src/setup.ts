import chalk from "chalk";
import gitly from "gitly";
import inquirer from "inquirer";
import ora from "ora";

export const setup = async (pandaApiOpenerText: string, gitHubRepo: string) => {
  // Introduction
  console.log(pandaApiOpenerText);
  console.log(
    chalk.yellow(
      "Welcome to the Panda API CLI. Let's get started! This guide will help you create a new Panda API project."
    )
  );

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

  // Download current github repo master branch of Panda API.
  const downloadSpinner = ora({
    text: "Downloading Panda API...",
    color: "blue",
  });
  try {
    downloadSpinner.start();
    await gitly(gitHubRepo, `./${answers.name}`, {});
  } catch (error) {
    console.log(chalk.red(error));
  } finally {
    downloadSpinner.stop();
  }

  // Initialize the project
  const initSpinner = ora({
    text: "Initializing project...",
    color: "blue",
  });
  try {
    initSpinner.start();
    // TODO: Replace project name in package.json and all that stuff needed...
  } catch (error) {
    console.log(chalk.red(error));
  } finally {
    initSpinner.stop();
  }

  // Done!
  console.log(
    chalk.green(
      `Yay, we're done! Your new project inside of the folder "./${answers.name}" is ready. Happy coding!`
    )
  );
};
