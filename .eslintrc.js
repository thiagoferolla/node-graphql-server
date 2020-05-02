module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ["standard"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: [2, "single", { avoidEscape: true }],
    semi: [2, "always"],
    'space-before-function-paren': 0
  },
};
