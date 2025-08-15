import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import jsoncParser from "jsonc-eslint-parser";
import jsoncPlugin from "eslint-plugin-jsonc";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      perfectionist,
    },
    rules: {
      ...tseslint.configs.strictTypeChecked.rules,
      ...tseslint.configs.stylisticTypeChecked.rules,
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
      "arrow-parens": "error",
      curly: "error",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              message: "Importing from lodash is restricted.",
              name: "lodash",
            },
            {
              message: "Importing from lodash/fp is restricted.",
              name: "lodash/fp",
            },
          ],
          patterns: [
            {
              group: ["lodash/fp/*"],
              message: "Importing from lodash/fp/* is restricted.",
            },
          ],
        },
      ],
      "perfectionist/sort-exports": "error",
      "perfectionist/sort-imports": [
        "error",
        {
          groups: [
            "unknown",
            "side-effect",
            ["builtin", "builtin-type"],
            ["external", "external-type"],
            ["parent", "parent-type"],
            ["sibling", "sibling-type", "index", "index-type"],
            "side-effect-style",
            "style",
            "object",
          ],
        },
      ],
      "perfectionist/sort-interfaces": [
        "error",
        {
          groups: [
            "unknown",
            "required-property",
            "property",
            "required-method",
            "method",
            "required-multiline",
            "multiline",
            "required-index-signature",
            "index-signature",
          ],
        },
      ],
      "perfectionist/sort-objects": "error",
    },
    settings: {
      perfectionist: {
        ignoreCase: true,
        order: "asc",
        type: "natural",
      },
    },
  },
  {
    files: ["**/*.json", "**/*.json5", "**/*.jsonc"],
    ignores: ["package.json"], // Let Prettier handle package.json formatting
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      jsonc: jsoncPlugin,
    },
    rules: {
      "jsonc/no-unicode-codepoint-escapes": "error",
      "jsonc/no-useless-escape": "error",
      "jsonc/object-property-newline": "error",
      "jsonc/sort-keys": "error",
    },
  },
  prettier,
  {
    ignores: ["dist/**/*", "node_modules/**/*", "coverage/**/*"],
  },
];
