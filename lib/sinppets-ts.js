export default [
    {
        name: "index",
        content: "export { default as $1Route } from \"./routes\";",
    },
    {
        name: "$2.routes",
        content: "import { Request, Response, Router } from \"express\";\nimport { adaptRequest, httpRequest } from \"../helper\";\nimport $2Service, { I$2Service } from \"./$2Service\";\nimport $2Repository from \"./$2Repository\";\n\nconst router = Router();\n\nconst $1Repository = new $2Repository();\nconst $1Service: I$2Service = new $2Service($1Repository);\n\nrouter.get(\"/\", makeRegistrationController(\"get$2\", $1Service));\n\nfunction makeRegistrationController(\n  action: keyof I$2Service,\n  handler: I$2Service\n) {\n  return async function controller(req: Request, res: Response) {\n    const httpRequest: httpRequest = adaptRequest(req);\n    const { headers, status, data } = await handler[action](httpRequest);\n    res.status(status).set(headers).json(data);\n  };\n}\n\nexport default router;\n",
    },
    {
        name: "$2Repository",
        content: "export default class $2Repository {}\n",
    },
    {
        name: "$2Service",
        content: "import { httpResponse, makeHttpResponse } from \"../helper\";\nimport { httpRequest } from \"../helper/adapt-request\";\nimport $2Repository from \"./$2Repository\";\n\nexport interface I$2Service {\n  get$2(req: httpRequest): Promise<httpResponse>;\n}\n\nclass $2Service implements I$2Service {\n  $1Repository: $2Repository;\n\n  constructor($1Repository: $2Repository) {\n    this.$1Repository = $1Repository;\n  }\n\n  async get$2(req: httpRequest): Promise<httpResponse> {\n    return makeHttpResponse(200, { message: \"hello world 👋\" });\n  }\n}\n\nexport default $2Service;\n",
    },
    {
        name: "utilities",
        content: ""
    }
]
