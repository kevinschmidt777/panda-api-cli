import chalk from "chalk";
import gitly from "gitly";
import inquirer from "inquirer";
import ora from "ora";
import packageJson from "@npmcli/package-json";

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
    /*{
      type: "checkbox",
      name: "features",
      message: "What features do you want to include?",
      choices: ["Authentication"],
    },*/
  ]);

  const spinner = ora({
    text: "Downloading current Panda API and getting things ready...",
    color: "blue",
  });
  try {
    spinner.start();
    // Download repo.
    await gitly(gitHubRepo, `./${answers.name}`, {});
    // Update package.json
    const pgkJson = await packageJson.load(`./${answers.name}`);
    pgkJson.update({
      name: answers.name,
      author: "",
      description: "a API built with Panda API Framework",
      keywords: ["panda-api"],
    });
    await pgkJson.save();
  } catch (error) {
    console.log(chalk.red(error));
  } finally {
    spinner.stop();
  }

  // Done!
  console.log(
    chalk.green(
      `Yay, we're done! Your new project inside of the folder "./${answers.name}" is ready. Happy coding!`
    )
  );
};
