module.exports = {
  backend: {
    output: {
      mode: "tags-split",
      target: "app/gen/backend.ts",
      schemas: "app/gen/schema",
      client: "react-query",
      clean: true,
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
    input: {
      target: "../backend/openapi.json",
    },
  },
};
