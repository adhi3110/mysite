// Globs for entrypoint files (in the order they need to be required)

const jsEntrypoints = [`**/main*.js`,`**/polyfills*.js`,`**/runtime*.js`];
const cssEntrypoints = ['**/*.css'];
const entrypoints = [...jsEntrypoints, ...cssEntrypoints];

module.exports = {
  jsEntrypoints,
  cssEntrypoints,
  entrypoints
};
