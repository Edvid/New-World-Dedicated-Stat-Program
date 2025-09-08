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
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "caughtErrorsIgnorePattern": "^_",
        }
      ]
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
    files: ["pagerenderer/tradeZoneWealth.js"],
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
  {
    files: ["stats/gameStats.js"],
    rules: {
      "no-dupe-class-members": [
        "off"
      ]
    },
  },
  tseslint.configs.stylistic,
  eslintConfigPrettier
);
