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
      // 'target': "https://api.furan.xyz/",
      'target': "http://localhost:5000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  },
  base: '/react/',
  publicPath: '/react/',
  history: 'hash',
}
