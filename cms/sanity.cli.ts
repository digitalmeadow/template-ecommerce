import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "iqfm6q7t",
    dataset: "production",
  },
  graphql: [
    {
      playground: true,
      tag: "default",
    },
  ],
});
