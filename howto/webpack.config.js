// webpack.config.js
module.exports = {
  mode: 'development',
  entry: './entry.js',  // Entry file that attaches 'acorn' to 'window'
  output: {
    filename: 'my-bundled-acorn.js',  // Output bundle file name
  },
  // ... other configuration options
};

