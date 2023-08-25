// Register the TypeScript evaluator in gatsby-config so we don't need to do
// it in any other .js file.
require(`ts-node`).register({
  transpileOnly: true,
  compilerOptions: {
    module: `commonjs`,
    target: `es2020`,
    jsx: `react-jsx`
  }
})

module.exports = require(`./gatsby/gatsby-config.ts`)
