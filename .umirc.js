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
      'target': "http://api.furan.xyz/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  },
  base: '/d3/',
  publicPath: '/d3/',
  exportStatic: true,
  history: 'hash',
}
