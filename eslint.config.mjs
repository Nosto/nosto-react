import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginPromise from 'eslint-plugin-promise'
import reactPlugin from 'eslint-plugin-react'

export default [
  eslint.configs.recommended,
  pluginPromise.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "promise/prefer-await-to-then": "error"
    }
  }
]
