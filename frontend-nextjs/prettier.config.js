import * as tailwind from "prettier-plugin-tailwindcss";
import root from "../prettier.config.mjs";

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  ...root,
  // Imported, not named: prettier resolves plugin names from the cwd, not this package.
  plugins: [tailwind],
  // Tailwind v4 has no JS config; the plugin reads tokens and @utility classes from here.
  tailwindStylesheet: "./src/styles/globals.css",
};

export default config;
