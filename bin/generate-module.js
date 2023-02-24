#!/usr/bin/env node
import argParser from "yargs-parser";

import { join, basename } from "path";
import { mkdirSync, writeFileSync } from "fs";

import { getHelpMessage } from "../lib/index.js";
import chalk from "chalk";
import { moduleSnippets as content } from "../lib/index.js";

const { _, h, help, ts } = argParser(process.argv.slice(2));

const fileType = ts ? "ts" : "js";

const helpMessage = getHelpMessage({
  description: "Generate an express module",
  usage: "$ npx generate_module <path>",
  options: [
    "--ts : generate TypeScript files, By default le module will be in pure javascript",
    "-h, --help: help menu",
  ],
  examples: "$ npx generate_module user",
});

if (h || help) {
  console.log(helpMessage);
  process.exit(1);
}

const currentPath = process.cwd();
const modulePath = join(currentPath, _[0]);
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
    content.forEach((file) => {
      file.content = file.content.replaceAll("$1", name);
      file.content = file.content.replaceAll(
        "$2",
        name[0].toUpperCase() + name.substring(1)
      );
      file.name = file.name.replaceAll("$1", name);
      writeFileSync(`${file.name}.${fileType}`, file.content || "");
    });
    console.log(`🚚 new module is created at ${chalk.bgGreen(_[0])}`);
  } catch (error) {
    console.log(error);
  }
}

main();
