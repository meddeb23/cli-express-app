export default [
  {
    name: "controller",
    content:
      'import { httpRequest } from "../helper/adapt-request";\nimport make$2List, { $1list } from "./$1-list";\n\nimport Debug from "debug";\nimport makeHttpError from "../helper/http-error";\n\nconst debug = Debug("$1:router");\n\nconst $1List: Readonly<$1list> = make$2List();\nexport const handle$2Endpoint = make$2EndpointHandler($1List);\n\nfunction make$2EndpointHandler(model: Readonly<$1list>) {\nreturn async function handler(req: httpRequest) {\nswitch (req.method) {\ncase "GET":\nreturn makeHttpError(200, "hello world 👋");\ndefault:\nreturn makeHttpError(404, "Not Found");\n}\n};\n}\n',
  },
  {
    name: "index",
    content: 'export { default as $1Route } from "./routes";',
  },
  {
    name: "routes",
    content:
      'import { Request, Response, Router } from "express";\nimport adaptRequest, { httpRequest } from "../helper/adapt-request";\nimport { handle$2Endpoint } from "./controller";\n\nconst router = Router();\n\nrouter.all("/", $1Controller);\nrouter.all("/:id", $1Controller);\n\nasync function $1Controller(req: Request, res: Response) {\nconst httpRequest: httpRequest = adaptRequest(req);\nconst { headers, status, data } = await handle$2Endpoint(httpRequest);\n\nres.status(status).set(headers).json(data);\n}\n\nexport default router;',
  },
  {
    name: "$1-list",
    content:
      "export type $1list = {};\n\nexport default function make$2List() {\nreturn Object.freeze({});\n}",
  },
  {
    name: "utilities",
    content: "",
  },
];
