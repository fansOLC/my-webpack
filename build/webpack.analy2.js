const prodConfig = require('./webpack.prod.js');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = merge(prodConfig, {
  plugins: [new BundleAnalyzerPlugin()],
});
