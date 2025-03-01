import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:import/recommended",
    "plugin:import/warnings",
    "plugin:tailwindcss/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ),
  {
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "{react,react-dom/**}",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react", "react-dom"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: false },
      ],
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
