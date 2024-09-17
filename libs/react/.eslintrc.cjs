module.exports = {
  root: true,
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "import",
    "promise",
    "unicorn",
    "prettier",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
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
  settings: {
    node: {
      tryExtensions: [".js", ".json", ".node", ".ts"],
    },
    react: {
      version: "detect",
    },
  },
  env: {
    node: true,
    es2020: true,
  },
};
