import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tsESLint from "typescript-eslint";

export default tsESLint.config({
  extends: [
    js.configs.recommended,
    ...tsESLint.configs.recommended,
    prettierConfig
  ],
  files: ["**/*.{ts,tsx}"],
  ignores: ["**/build/**", "**/dist/**"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "no-console": ["error", { allow: ["warn", "error"] }]
  }
});
