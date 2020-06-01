const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const OUTPUT_DIR = path.resolve(__dirname, '..', '..', 'build', 'ui')

module.exports = {
  entry: path.resolve(__dirname, 'index.ts'),
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: { configFile: '../../tsconfig.json' }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: OUTPUT_DIR
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'clean architecture + mono repository'
    }),
    new BundleAnalyzerPlugin()
  ],
  devServer: {
    contentBase: OUTPUT_DIR,
    compress: true,
    port: 3000
  }
}
