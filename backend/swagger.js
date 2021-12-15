const swaggerJson = {
  swagger: "2.0",
  info: {
    description: "This is a MEVN Project",
    version: "1.0.0",
    title: "MEVN",
  },
  tags: [
    {
      name: "provider",
      description: "Operations about provider",
    },
    {
      name: "client",
      description: "Operations about client",
    },
  ],
  schemes: ["http"],
  paths: {
    "/api/providers": {
      get: {
        tags: ["provider"],
        summary: "Returns available providers",
        description: "get providers names",
        produces: ["application/json"],
        parameters: [],
        responses: {
          200: {
            description: "list of providers",
            schema: {
              type: "object",
              example: [
                {
                  id: "12sd3sdfef32wef323sdf32f",
                  name: "Provider 1",
                },
                {
                  id: "asdsa223ef32wef323sdf32f",
                  name: "Provider 2",
                },
              ],
            },
          },
        },
      },
    },
    "/api/clients": {
      get: {
        tags: ["client"],
        summary: "get clients",
        description: "get all clients details",
        produces: ["application/json"],
        parameters: [],
        responses: {
          default: {
            description: "list of clients",
            schema: {
              type: "object",
              example: [
                {
                  id: "12sd3sdfef32wef323sdf32f",
                  name: "Provider 1",
                  email: "adsadasd@sd.asd",
                  phone: "123213343",
                  providers: [
                    { id: "s2d2d2adsced322d56" },
                    { id: "s2d2d2adsced322d56" },
                  ],
                },
                {
                  id: "12sd3sdfef32wef323sdf32f",
                  name: "Provider 2",
                  email: "zxcasd@sd.asd",
                  phone: "123213343",
                  providers: [
                    { id: "s2d2d2adsced322d56" },
                    { id: "s2d2d2adsced322d56" },
                  ],
                },
              ],
            },
          },
        },
      },
    },
    "/api/clients/add": {
      post: {
        tags: ["client"],
        summary: "Add Client",
        description: "Add new Client",
        produces: ["application/json"],
        parameters: [
          {
            name: "name",
            in: "query",
            description: "name of the client",
            required: true,
            type: "string",
          },
          {
            name: "email",
            in: "query",
            description: "The user name for login",
            required: true,
            type: "string",
          },
          {
            name: "phone",
            in: "query",
            description: "phone number of client",
            required: true,
            type: "string",
          },
          {
            name: "providers",
            in: "query",
            description: "providers of the client",
            required: true,
            type: "array",
          },
        ],
        responses: {
          default: {
            description: "successful operation",
          },
        },
      },
    },
    "/api/clients/update": {
      put: {
        tags: ["client"],
        summary: "update client",
        description: "update existing client",
        produces: ["application/json"],
        parameters: [
          {
            name: "name",
            in: "query",
            description: "name for client",
            required: true,
            type: "string",
          },
          {
            name: "email",
            in: "query",
            description: "new email for the client",
            required: true,
            type: "string",
          },
          {
            name: "phone",
            in: "query",
            description: "new phone number for the client",
            required: true,
            type: "number",
          },
          {
            name: "providers",
            in: "query",
            description: "providers for the client",
            required: true,
            type: "array",
          },
        ],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              type: "string",
            },
          },
          400: {
            description: "Invalid data",
          },
        },
      },
    },
    "/api/clients/delete/{id}": {
      delete: {
        tags: ["client"],
        summary: "Delete client",
        description: "",
        produces: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id that needs client deletion ",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "successful operation",
          },
          404: {
            description: "Client not found",
          },
        },
      },
    },
  },
  definitions: {
    provider: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
      },
    },
    client: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        email: {
          type: "string",
        },
        phone: {
          type: "number",
        },
        providers: [
          {
            type: "array",
            description: "provider id",
          },
        ],
      },
    },
  },
};

export { swaggerJson };
