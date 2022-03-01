// eslint-disable-next-line @typescript-eslint/no-var-requires
const TerserPlugin = require('terser-webpack-plugin')
module.exports = function (options) {
  return {
    ...options,
    plugins: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'],
          },
        },
      }),
    ],
  }
}
