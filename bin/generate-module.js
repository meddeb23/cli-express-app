#!/usr/bin/env node
import argParser from "yargs-parser";

import { join, basename } from "path";
import { mkdirSync, writeFileSync } from "fs";

import { getHelpMessage } from "../lib/index.js";
import chalk from "chalk";
import { jsModuleSnippets, tsModuleSnippets } from "../lib/index.js";


const { _, h, help, ts } = argParser(process.argv.slice(2));

const fileType = ts ? "ts" : "js";

const helpMessage = getHelpMessage({
  description: "Generate an express module",
  usage: "$ npx generate_module <path>",
  options: [
    "--ts : generate TypeScript files, By default le module will be in pure javascript",
    "-h, --help: help menu",
  ],
  examples: "$ npx cli-express-app generate_module user",
});

if (!_.length) {
  console.log(`${chalk.bgRed(" UNVALID ARGUMENTS ")} module name is required\n`);
  console.log(`${chalk.bgBlue(" Help ")}`);
  console.log(helpMessage);
  process.exit(1);
}

if (h || help) {
  console.log(helpMessage);
  process.exit(1);
}

const currentPath = process.cwd();
const modulePath = ts ? join(currentPath, "src", _[0]) : join(currentPath, _[0])
const name = basename(modulePath);

try {
  mkdirSync(modulePath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(
      `module ${chalk.bgRed(
        _[0]
      )} already exist in the current directory, please give it another name.`
    );
  } else {
    console.log(err);
  }
  process.exit(1);
}

async function main() {
  try {
    process.chdir(modulePath);
    const content = ts ? tsModuleSnippets : jsModuleSnippets
    console.log(`\n🚚 creating new module at ${chalk.bgBlue(modulePath)}\n`);

    const lowName = name.toLowerCase()
    const capName = name[0].toUpperCase() + name.substring(1)
    content.forEach((file) => {
      file.content = file.content.replaceAll("$1", lowName);
      file.content = file.content.replaceAll(
        "$2",
        capName
      );
      file.name = file.name.replaceAll("$1", lowName);
      file.name = file.name.replaceAll("$2", capName);

      writeFileSync(`${file.name}.${fileType}`, file.content || "");
      console.log(`\n\t✅ creating new file at ${chalk.blue(`${file.name}.${fileType}`)}`);

    });
    console.log(`\n\n✨ Route export with name ${chalk.green(`${lowName}Route`)}`);
  } catch (error) {
    console.log(error);
  }
}

main();
