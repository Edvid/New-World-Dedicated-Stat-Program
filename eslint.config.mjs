// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      "no-debugger": "off",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["pagerenderer/nationSheetGenerator.js"],
    languageOptions: {
      globals: {
        am5: "readonly",
        am5percent: "readonly",
      }
    }
  },
  {
    files: ["pagerenderer/mapccfcalculations.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      }
    }
  },
  tseslint.configs.stylistic,
  eslintConfigPrettier
);
