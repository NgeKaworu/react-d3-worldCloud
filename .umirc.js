export default {
  plugins: ['umi-plugin-dva'],
  proxy: {
    '/api': {
      'target': "http://localhost:5000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  }
}
