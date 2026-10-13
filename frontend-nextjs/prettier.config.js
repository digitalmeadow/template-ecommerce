/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  // Tailwind v4 has no JS config; the plugin reads tokens and @utility classes from here.
  tailwindStylesheet: "./src/styles/globals.css",
};

export default config;
