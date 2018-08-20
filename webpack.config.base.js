/**
 * @file Webpack basic configuration file.
 */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const tsImportPluginFactory = require('ts-import-plugin')
const _ = require('./common/utils')
const views = require('./app/view')
const commons = ['react', 'lodash', 'mobx', 'mobx-react', 'react-dom', 'react-router', 'react-router-dom']

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
              libraryDirectory: 'es',
              style: 'css'
            }) ]
          })
        },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "app"),
        ]
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
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [{
          loader:'file-loader',
          options: {
            name: '[path][name].[ext]', //path为相对于context的路径
            context:'src',
            publicPath:function(url){//返回最终的资源相对路径
              return path.relative(path.resolve(__dirname, 'dist'), url).replace(/\\/g,'/');
            }
          }
        }]
      }
    ]
  }

}
