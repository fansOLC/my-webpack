/**
 * 打包配置
 */
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base.js');
const { merge } = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  externals: {
    // 当前热更新插件@pmmmwh/react-refresh-webpack-plugin版本，如果配置了externals热更新失效。
    // 当前临时解决方案：开发环境不配置externals，生产环境配置。
    // 持续关注版本更新解决方案
    react: 'React',
    'react-dom': 'ReactDOM',
    // 'react-dom/client': 'ReactDOM',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css', // 设置生成的css文件名
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), // 复制public下文件
          to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
          filter: (resourcePath) => {
            // 在上面的配置中,忽略了index.html,因为html-webpack-plugin会以public下的index.html为模板生成一个index.html到dist文件下,所以不需要再复制该文件了。
            return !resourcePath.includes('index.html'); // 忽略index.html
          },
        },
      ],
    }),
  ],
  optimization: {
    //minimize: true, // 是否开启压缩
    minimizer: [
      `...`, // 配置后，analy中speed-measure-webpack-plugin包不兼容webpack5的这个特性会报错
      new CssMinimizerPlugin(), // 压缩css
    ],
    splitChunks: {
      chunks: 'all',
      // 分隔代码
      cacheGroups: {
        vendors: {
          // 提取node_modules代码
          test: /[\\/]node_modules[\\/]/, // 只匹配node_modules里面的模块
          name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的  必须三选一： "initial" | "all" | "async"(默认就是异步)
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        commons: {
          // 提取页面公共代码
          name: 'commons', // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        },
      },
    },
  },
});
