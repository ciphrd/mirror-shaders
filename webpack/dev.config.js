const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

  mode: 'development',
  
  entry: `./src/main.js`,

  output: 
  {
    path: path.resolve(__dirname, 'dist'),
    filename: `bundle.js`,
  },
  
  devtool: "cheap-module-eval-source-map",

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

  devServer: {
    port: 9000,
    inline: true,
    contentBase: "./public/",
    open: true,
    overlay: true,
    stats: "minimal"
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],

  resolve: 
  {
    modules: [ path.resolve(__dirname, '../node_modules') ],
  },

}
