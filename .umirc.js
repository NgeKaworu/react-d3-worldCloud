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
      'target': process.env.NODE_ENV === 'production' ? 'https://api.furan.xyz' : 'http://localhost:5000',
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  },
  base: '/react/',
  publicPath: '/react/',
  history: 'hash',
}
