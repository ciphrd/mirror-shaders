const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {

  mode: 'production',
  
  entry: `./src/main.js`,

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `bundle.js`
  },

  node: {
    fs: 'empty'
  },

  module: 
  {
    rules: [
      {
        test: /\.js$/,
        exclude: /nodes_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: false
          }
        }
      }, 
      {
        test: /\.(png|svg|jpg|jpeg|gif|obj)$/,
        use: [ "file-loader" ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],

  resolve: 
  {
    modules: [ path.resolve(__dirname, '../node_modules') ],
  },

}