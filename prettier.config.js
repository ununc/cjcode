/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: false,
  trailingComma: "none",
  semi: true,
  useTabs: false,
  tabWidth: 2,
  printWidth: 80,
  arrowParens: "always",
  bracketSpacing: true,
  bracketSameLine: false,
  endOfLine: "lf",
  htmlWhitespaceSensitivity: "css",
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  jsxBracketSameLine: false,
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"]
};

export default config;
