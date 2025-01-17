import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginPromise from 'eslint-plugin-promise'
import reactPlugin from 'eslint-plugin-react'
import barrelFiles from "eslint-plugin-barrel-files"

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
  },
  {
    plugins: {
      "barrel-files": barrelFiles
    },
    rules: {
      "barrel-files/avoid-barrel-files": 2,
      "barrel-files/avoid-importing-barrel-files": 2,
      "barrel-files/avoid-namespace-import": 2,
      "barrel-files/avoid-re-export-all": 2
    }
  }
]
