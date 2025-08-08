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
    files: ["pagerenderer/mapccfcalculations.js"],
    languageOptions: {
      globals: {
        gameStats: "readonly",
        prepareData: "readonly",
        mappedResources: "readonly",
        mappedResourcesMultipliers: "readonly",
        fetchFour: "readonly",
        rgbToHex: "readonly",
        NumAsRGB: "readonly",
        FetchedRGBAsNum: "readonly",
        maxPopInPixel: "readonly",
        hexAsNumToHumanReadableMinMaxGradient: "readonly",
        advanceMap: "readonly",
        ...globals.browser,
      }
    }
  },
  tseslint.configs.stylistic,
  eslintConfigPrettier
);
