#!/usr/bin/env node

import { execSync } from "child_process";
import { join, basename } from "path";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import chalk from "chalk";
import argParser from "yargs-parser";
import { getHelpMessage } from "../lib/index.js";
const { _, n, name, h, help } = argParser(process.argv.slice(2));

const helpMessage = getHelpMessage({
  description:
    "Create Express application with no configuration using the clean architecture pattren",
  usage: "$ npx cli-express-app <path> [options]",
  options: [
    "-n, --name: name of the project, the project will be named as the current folder by default",
    "-h, --help: help menu",
  ],
  examples: "$ npx cli-express-app my_new_app",
});

if (h || help) {
  console.log(helpMessage);
  process.exit(1);
}

if (!_.length) {
  console.log(`${chalk.bgRed(" UNVALID ARGUMENTS ")} path is required`);
  console.log(`\n${chalk.bgBlue(" Help ")}`);
  console.log(helpMessage);
  process.exit(1);
}
const currentPath = process.cwd();
const projectPath = join(currentPath, _[0]);
const git_repo = "https://github.com/meddeb23/create_express_app.git";
const projectName = n || name || basename(projectPath);
try {
  mkdirSync(projectPath, { recursive: true });
} catch (err) {
  if (err.code === "EEXIST") {
    if (existsSync(join(projectPath, "package.json"))) {
      console.log(
        `${chalk.bgRed(projectPath)} already containes a ${chalk.bgGreen(
          " package.json "
        )} file, please choose another folder.`
      );
      //   process.exit(1);
    }
  } else {
    console.log(err);
    process.exit(1);
  }
}

async function main() {
  try {
    console.log(`\nCreating a new express app in ${chalk.bgGreen(_[0])}\n`);
    console.log("\n[1/4] 🚚 Downloading files...\n");
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

    process.chdir(projectPath);

    console.log("\n[2/4] 🔎 Installing dependencies...\n");
    execSync("npm install", { stdio: "inherit" });

    console.log("\n[3/4] ❌ Removing useless files");
    execSync("npx rimraf ./.git");

    console.log("[4/4] 🧹 cleaning up\n");
    let package_json = readFileSync(join(projectPath, "package.json"), "utf-8");
    package_json = JSON.parse(package_json);
    package_json.name = projectName;
    writeFileSync(
      join(projectPath, "package.json"),
      JSON.stringify(package_json),
      "utf-8"
    );

    console.log(
      `\n✨ ${chalk.bgBlue(
        " Success! "
      )} setup is completed, new app at ${chalk.bgGreen(_[0])}\n\n> cd ${_[0]
      }\n> npm run dev\n\n\n 🍕 Happy coding `
    );
  } catch (error) {
    console.log(error);
  }
}
main();
