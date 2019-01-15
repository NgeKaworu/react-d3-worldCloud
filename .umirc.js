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
      'target': "http://127.0.0.1:5000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  },
  base: '/react/',
  publicPath: '/react/',
  history: 'hash',
}
