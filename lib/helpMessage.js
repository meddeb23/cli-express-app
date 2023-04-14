import chalk from "chalk";

export default ({ description, usage, options, examples }) =>
  `cli-express-app

    ${chalk.blue(" Description ")}
      ${description}

    ${chalk.blue(" Usage ")}
    ${usage}
    
    ${chalk.blue(" Options ")}
    ${options.join("\n    ")}
    
    ${chalk.blue(" Examples ")}
        ${examples}
    `;
