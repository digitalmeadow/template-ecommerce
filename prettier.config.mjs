import { options, parsers } from "@ianvs/prettier-plugin-sort-imports";

// Its ember and oxc parsers throw on access without optional peers, so expose only the ones in use.
const sortImports = {
  name: "@ianvs/prettier-plugin-sort-imports",
  options,
  parsers: {
    babel: parsers.babel,
    "babel-ts": parsers["babel-ts"],
    typescript: parsers.typescript,
  },
};

/** @type {import('prettier').Config & import('@ianvs/prettier-plugin-sort-imports').PluginConfig} */
const config = {
  semi: true,
  printWidth: 100,
  bracketSpacing: true,
  singleQuote: false,
  plugins: [sortImports],
  // Node, packages (workspace ones included), path aliases, then relative files.
  importOrder: [
    "<BUILTIN_MODULES>",
    "<THIRD_PARTY_MODULES>",
    "^@(/|config$|(blocks|components|decorations|dev|fields|layouts|lib|meta|pages|scripts|sections|stores|styles|svgs|utils)/)",
    "^[.]",
  ],
};

export default config;
