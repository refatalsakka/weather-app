const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config();

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'dist/js/app.js',
    environment: {
      arrowFunction: false,
      const: false,
      destructuring: false,
      forOf: false,
    },
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'src/index.ejs',
      process: {
        env: {
          API_TOCKEN_MAP: process.env.API_TOCKEN_MAP,
          API_TOCKEN_MAP_DARK_ID: process.env.API_TOCKEN_MAP_DARK_ID,
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'dist/css/style.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name(resourcePath) {
              return resourcePath.replace(/^.+src\\/ig, '');
            },
          },
        },
      },
    ],
  },
};
