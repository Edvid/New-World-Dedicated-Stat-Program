// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  tseslint.configs.stylistic,
  eslintConfigPrettier
);
