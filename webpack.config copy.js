const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    //app: ["@babel/polyfill", './src/index.js'],
    //hello: ["@babel/polyfill", './src/hello.js']
    app: './src/index.js',
    hello: './src/hello.js',
  },
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'), //__dirname 全局变量当前目录
    filename: "js/[name]-[hash].bundle.js" // name == app/hello 
  },
  module: {
    rules: [{
      test: /\.m?js$/,  //解析什么文件
      exclude: /(node_modules|bower_components)/,  //不包含
      use: {
        loader: 'babel-loader',
          // options: {
          //   presets: [['@babel/preset-env', { "debug": true }]],
          //   plugins: [["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true }]]
          // }
      }
    },
    {
      test: /\.css$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: (resourcePath, context) => {
              // publicPath is the relative path of the resource to the context
              // e.g. for ./css/admin/main.css the publicPath will be ../../
              // while for ./css/main.css the publicPath will be ../
              return path.relative(path.dirname(resourcePath), context) + '/';
            },
          },
        }, 'css-loader'
      ],
    },
    {
      test: /\.(scss|sass)$/,
      use: [
         devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
    },
    {
      test: /\.less$/,
      use: [{
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader', // translates CSS into CommonJS
        },
        {
          loader: 'less-loader', // compiles Less to CSS
        },
      ],
    },
    {
      test: /\.(png|jpe?g|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: 'images/', //输出到dist目录下的images
        },
      }, 
      {
        loader: 'image-webpack-loader',
        options: {
        },
      }],
    },
    ]
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Admin',
      filename: 'admin.html',
      template: 'public/index.html',
      chunks:['hello'], //使用hello 编译出来的js
    }),
    new HtmlWebpackPlugin({
      title: 'Index',
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ['app'], //使用app 编译出来的js
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: devMode ? 'css/[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
}