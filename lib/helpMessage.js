import chalk from "chalk";

export default ({ description, usage, options, examples }) =>
  `
    cli-express-app

    ${chalk.bgGreen(" Description ")}
      ${description}

    ${chalk.bgGreen(" Usage ")}
    ${usage}
    
    ${chalk.bgGreen(" Options ")}
    ${options.join("\n    ")}
    
    ${chalk.bgGreen(" Examples ")}
        ${examples}
    `;
