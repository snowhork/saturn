module.exports = {
  backend: {
    output: {
      mode: "tags-split",
      target: "src/gen/backend.ts",
      schemas: "src/gen/schema",
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
