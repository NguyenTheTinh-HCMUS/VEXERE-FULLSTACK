const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === "development";
const VENDOR_LIBS = [
  "axios",
  "bootstrap",

  "jquery",
  "react",
  "react-dom",
  "react-redux",
  "react-router-dom",
  "redux",
  "redux-thunk",
  "popper.js"
  
];

const config = {
  entry: {
    bundle: "./src/index.js",
    vendor: VENDOR_LIBS
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.join(__dirname, "dist"),
    publicPath: "/"
    // path: '/'
    
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: "/node_modules"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      }
    ]
  },
  mode: "development",
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css"
    }),
    new MomentLocalesPlugin(),
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'ru'],
  })
  ],
  resolve: {
   
        extensions: ['.js', '.jsx', '.scss']
      },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'src'),
    port: 4040,
  open: true
  }
};

module.exports = config;
