import js from "@eslint/js"
import tsParser from "@typescript-eslint/parser"
import solid from "eslint-plugin-solid/configs/typescript"
import ts from "typescript-eslint"

export default [
  {
    ignores: ["**/*.config.*", "**/*.json"]
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json"
      }
    }
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ]
    }
  }
]
