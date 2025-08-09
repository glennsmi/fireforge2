/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: ["**/dist/**", "**/lib/**", "**/node_modules/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {}
  }
];



