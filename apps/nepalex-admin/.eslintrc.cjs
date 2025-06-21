/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  plugins: [
    "@typescript-eslint",
    "import",
    "react-refresh",
    "react",
    "react-hooks",
    "unicorn",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "import/order": [
      1,
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
      },
    ],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
    "unicorn/numeric-separators-style": [
      "error",
      {
        number: {
          minimumDigits: 6,
          groupLength: 3,
        },
      },
    ],
    "unicorn/prevent-abbreviations": [
      "error",
      {
        allowList: {
          db: true,
          docs: true,
          env: true,
          err: true,
          i: true,
          param: true,
          req: true,
          res: true,
        },
      },
    ],
  },
};
