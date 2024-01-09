const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// webpack.config.js
module.exports = {
  mode: 'development',
  entry: './src/awaitify.js',  // Entry file that attaches 'acorn' to 'window'
  output: {
    filename: 'index.js',  // Output bundle file name
  },
  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html'
  })],
  optimization: {
    minimize: false, // This disables minification
  },
  // ... other configuration options
};
