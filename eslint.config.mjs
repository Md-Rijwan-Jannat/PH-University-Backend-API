import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { languageOptions: { globals: globals.node } },
  {
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-undef": "error",
      "no-console": "warn",
      " @typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    ignores: ["**/node_modules/", "**dist/"],
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
