/**
 * @file Webpack configuration file for development
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLintPlugin = require('stylelint-bare-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = require('./webpack.config.base')

config.mode = 'development'

config.output.filename = '[name].js'

config.plugins = [
  new MiniCssExtractPlugin({
    filename: 'css/style.css',
    chunkFilename: 'css/style.css'
  }),
  // new StyleLintPlugin({
  //   syntax: 'scss',
  //   failOnError: true
  // }),
  new CopyWebpackPlugin([
    { from: './app/images', to: 'images' }
  ]),
  new ManifestPlugin({
    fileName: 'manifest.json',
  })
]

config.optimization = {
  runtimeChunk: false,
  splitChunks: {
    cacheGroups: {
      default: false,
      commons: {
        name: 'commons',
        filename: 'js/commons.js',
        chunks: 'initial'
      },
      // merge all the css into one file
      styles: {
        name: 'styles',
        test: /\.s?css$/,
        chunks: 'all',
        enforce: true
      },
    }
  }
}

module.exports = config