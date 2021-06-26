require(`@saeris/eslint-config/patch`)

module.exports = {
  extends: [
    `@saeris/eslint-config/base`,
    `@saeris/eslint-config/jest`,
    `@saeris/eslint-config/type-aware`,
    `@saeris/eslint-config/typescript`
  ],
  parserOptions: {
    project: "./tsconfig.eslint.json"
  },
  ignorePatterns: [
    "*.js",
    "./lambda/*",
    "./public/*",
    "./static/*",
    "./styles/*"
  ]
}
