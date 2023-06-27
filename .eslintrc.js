/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node", "plugin:vitest-globals/recommended"],
  "env": {
    "vitest-globals/env": true
  }
};
