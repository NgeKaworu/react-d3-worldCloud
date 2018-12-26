export default {
  plugins: ['umi-plugin-dva'],
  proxy: {
    '/api': {
      'target': "http://api.furan.xyz/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  }
}
