/**
 * @file Webpack basic configuration file.
 */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const tsImportPluginFactory = require('ts-import-plugin')
const _ = require('./common/utils')
const views = require('./app/view')

const commons = ['react', 'lodash', 'antd', 'mobx', 'mobx-react', 'react-dom', 'react-router', 'react-router-dom']

module.exports = {
  entry: { ..._.getEntity(views), commons },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss', '.less']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [ tsImportPluginFactory({
              libraryName: 'antd',
              style: 'css'
            }) ]
          })
        },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap&minimize',
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }

        ]
      }
    ]
  }

}