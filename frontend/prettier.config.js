import * as astro from "prettier-plugin-astro";
import root from "../prettier.config.mjs";

/** @type {import('prettier').Config} */
const config = {
  ...root,
  // Imported, not named: prettier resolves plugin names from the cwd, not this package.
  plugins: [astro],
};

export default config;
