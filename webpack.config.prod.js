/**
 * @file Webpack configuration file for production
 */

const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLintPlugin = require('stylelint-bare-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = require('./webpack.config.base')

config.mode = 'production'

config.output.filename = '[name].[chunkhash:8].js'

config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new UglifyJsPlugin({
    cache: true,
    parallel: true,
    sourceMap: true,
  }),
  new MiniCssExtractPlugin({
    filename: 'css/style.[chunkhash:8].css',
    chunkFilename: 'css/style.[chunkhash:8].css'
  }),
  new StyleLintPlugin({
    syntax: 'scss',
    failOnError: true,
  }),
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
        filename: 'js/commons.[chunkhash:8].js',
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