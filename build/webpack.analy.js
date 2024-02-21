const prodConfig = require('./webpack.prod.js');
const { merge } = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // webpack打包速度分析插件
const smp = new SpeedMeasurePlugin();
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // 引入分析打包结果插件

module.exports = smp.wrap(
  merge(prodConfig, {
    // Add your additional configurations here
    plugins: [new BundleAnalyzerPlugin()],
  }),
);
