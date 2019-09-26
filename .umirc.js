export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: true,
        antd: true,
        dynamicImport: {
          webpackChunkName: true,
        },
      }
    ],
  ],
  proxy: {
    '/api': {
      'target': "https://api.furan.xyz/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  },
  base: '/react/',
  publicPath: '/react/',
  history: 'hash',
}
