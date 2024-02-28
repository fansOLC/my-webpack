const isDev = process.env.NODE_ENV === 'development';
const reactRefreshPlugin = isDev
  ? require.resolve('react-refresh/babel')
  : null;

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.35.1',
        modules: 'commonjs',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    reactRefreshPlugin, // 生产环境不需要热更新
  ].filter(Boolean),
};
