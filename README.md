# WebPack4使用总结
## 1.安装
```
$ npm install --global webpack
$ npm install --global webpack-cli
$ webpack -v
```

## 2. 基础配置

### 1.目录结构
```
webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```
## 2.运行
运行webpack  自动编译src / index.js 文件
![image](https://github.com/FanWorldBegin/webpack-guilde/blob/master/images/1.png)
生成了个 dist 文件夹/main.js
![image](https://github.com/FanWorldBegin/webpack-guilde/blob/master/images/2.png)

## 3. 通过命令行修改为开发环境 
开发环境模式打包
```
webpack --mode=development
```
本地电脑运行为开发环境 - 不用考虑编译文件大小

在线上的为生产环境 - 线上环境编译文件需要小一些，下载速度快，代码会压缩。

## 4.搭建项目
### 1.可以通过命令行设置入口文件，出口文件
```
webpack --mode=development ./src/hello.js --output ./build/main.js
```
### 2.通过配置文件来设置
1. npm init -y  -- 生成package.json 文件
2. 配置文件  开发环境启动命令 npm run dev ， 生产环境启动命令
```javascript
{
  "name": "hello-webpack-4",
  "version": "1.0.0",
  "description": "Webpack4学习总结",
  "main": "index.js",
  "scripts": {
    "dev": "webpack --mode=development",
    "build": 'webpack --mode=production'
  },
}
```

### 3.项目中安装依赖写入devDependencies
```
npm install webpack webpack-cli --save-dev
```

## 5.使用npx解决全局安装问题
全局安装webpack时候对于不同项目会有兼容问题。

使用npx可以执行node_modules 中的webpack 而不是全局的，使用npx 执行npm包的二进制文件。
```
$ npm install -g npx
$ npx webpack --mode=development
```
```
  "scripts": {
    "dev": "npx webpack --mode=development",
    "build": 'webpack --mode=production'
  },
```

## 6.使用配置文件webpack.config.js
项目运行会自动寻找webpack.config.js
```
const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "app.bundle.js"
  },
  mode: 'development'
}
```
* path.resolve() 方法将相对路径转换为绝对路径。
* __dirname：    获得当前执行文件所在目录的完整目录名
* mode 设置为开发模式

### package.json
```
  "scripts": {
    "dev": "npx webpack",
  },
```
## 7. 配置多入口文件 Entry Points
```javascript
const path = require('path');

module.exports = {
  // entry: "./src/index.js",
  entry: {
    app: './src/index.js',
    hello: './src/hello.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js"
  },
  mode: 'development'
}
```

* 当需要编译出多个文件时候，引入多个打包js文件,性能好一些，把相同的js 放在同一个文件。
* 输出文件名名称使用 [name] 替换

### 运行打包
npm run dev 打包出两个文件。
* dist/app.bundle.js
* dist/hello.bundle.js

### 在index.html中分别引入
```html
<script src="./dist/app.bundle.js"></script>
<script src="./dist/hello.bundle.js"></script>
```

## 8.什么是Babel
Bebel 是一个javascript 编译器,浏览器的语法会发展的慢一些.
### polyfill
腻子脚本，是一段Javascript代码，能够赋予浏览器未曾有过的功能。


## 9.babel-loader 的介绍与安装
### 1.loader
loader官方解释是文件预处理器，通俗点说就是webpack在处理静态文件的时候，需要使用 loader 来加载各种文件，比如： html文件需要使用html-loader ,css 需要使用css-loader 、 style-loader 等等。
### 2.babel-loader
来处理ES6语法，将其编译为浏览器可以执行的js语法。

* babel/core 核心库
* babel/cli 命令行工具库
* @babel 为了更好地归类，把相关依赖放在同一个目录中， 安装后在node_module 会放在同一个目录中
### 3.第一步安装核心库
因为不在命令行中使用所以不用@babel/cli
npm install --save-dev @babel/core 

### 4.安装webpack 插件
babel-webpack结合使用这个库
npm install -D babel-loader

### 5.插件分类
* 压缩的，处理css html --- Plugins
* 处理文件格式转换的 --- Loaders


## 10.安装babel 插件转换箭头函数
```
npm install --save-dev @babel/plugin-transform-arrow-functions
```
### 1.通过webpack使用babel插件
![image](https://github.com/FanWorldBegin/webpack-guilde/blob/master/images/3.png)

### 2.使用babel配置文件来使用插件
会自动读取 .babelrc文件
```javascript
{
  "plugins": ["babel/plugin-transform-arrow-functions"]
}
```

### 3.更多插件
.babelrc
```javascript
{
  "plugins": ["@babel/plugin-transform-arrow-functions",
              "@babel/plugin-transform-classes",
              ["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true }]]
}
```
src/index.js
.babelrc
#### 1.转化class
npm install --save-dev @babel/plugin-transform-classes
```javascript
class Test {
  constructor(name) {
    this.name = name;
  }

  logger () {
    console.log("Hello", this.name);
  }
}

```

#### 1.装饰器语法插件
```javascript
@decorator
class A {

}

function decorator(target) {
  target.index = 1;
}

 // A.index = 1
```

## 11. 用预设Presets   es6- babel- 插件打包加载
### 1. 使用预设Presets
统一处理ES6的语法而不用每次添加新的插件,集合一系列的插件组合在一起，不需要一个个插件添加，会自动添加.

安装
```javascript
npm install --save-dev @babel/preset-env
```

### 2.babelrc 中配置
```javascript
{
  "presets": [['@babel/preset-env', { "debug": true }]],
  "plugins": [["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true }]]
}
```
### 3.webpack中配置
{ "debug": true }  --调试模式显示集合包含什么插件
![image](https://github.com/FanWorldBegin/webpack-guilde/blob/master/images/4.png)

## 12. devtool false 让编译后的代码可读性强一些
```javascript
module.exports = {
  // entry: "./src/index.js",
  entry: {
    app: './src/index.js',
    hello: './src/hello.js'
  },
  devtool: false,
  ...
```

## 12. @babelpolyfill
### 1.简介
babel只负责语法转换，比如将ES6的语法转换成ES5。但如果有些对象、方法，浏览器本身不支持，比如：
* 全局对象：Promise、WeakMap 等。
* 全局静态函数：Array.from、Object.assign 等。
* 实例方法：比如 Array.prototype.includes 等。
新版本的浏览器可以识别语法，但低版本的可能会报错，此时，需要引入babel-polyfill来模拟实现这些对象、方法。
src/index.js
```javascript
Object.assign({})
Array.from([1,2,3])
new Promise(resolve => console.log('promise'))
```

### 2.安装
npm install --save @babel/polyfill
![image](https://github.com/FanWorldBegin/webpack-guilde/blob/master/images/5.png)

除了在 webpack.config.js 中的 entry 引入 @babel/polyfill 之外，在需要的 src/index.js 等 js 文件最顶部引入 import '@babel/polyfill' 也是一样的。


## 13.preset-env 的选项和按须编译
### 1. 第二种方法配置polyfill - 不在webpack.config.js 中配置
使用参数useBuitIns： usage  就只打包需要的 按需加载

修改 .babelrc
```javascript
{
  "presets": [['@babel/preset-env', { "debug": true, "useBuiltIns": "usage" }]],
  "plugins": [["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true }]]
}
```


### 2.在index.js中引入
import polyfill 默认会加载所有可能用到的polyfill 不管代码中是否用到导致编译体积大
使用参数useBuitIns： usage  就只打包需要的 按需加载

```javascript
import '@babel/polyfill'
```

## 14. @babel/runtime
引入babel-polyfill会有一定副作用，会造成全局污染比如：

* 引入了新的全局对象：比如Promise、WeakMap等。
* 修改现有的全局对象：比如修改了Array、String的原型链等。
* 在应用开发中，上述行为问题不大，基本可控。但如果在库、工具的开发中引入babel-polyfill，则会带来潜在的问题。

使用 @babel/runtime 解决不用全局变量替换，不会污染其他包的promise

### 1.安装
```
$ npm install --save @babel/runtime
$ npm install --save-dev @babel/plugin-transform-runtime
$ npm install --save @babel/runtime-corejs2
```

###  配置

```javascript
{
  "presets": [['@babel/preset-env', { "debug": true }]],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true }
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```

## 15. 搭建react 开发环境
src/App.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <p>React here!</p>
    </div>
  )
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
```

### 1.插件安装
* 安装react
* 添加babel 预设@babel/preset-react
```
$ npm install react react-dom
$ npm install --save-dev @babel/preset-react
```
![image](https://github.com/FanWorldBegin/webpack-guilde/blob/master/images/6.png)


## 16. webpack 插件 html-webpack-plugin
* plugin 扩展功能
* loader 转化文件
  
### 1.html-webpack-plugin 作用
index.html 是一个入口文件。插件解决手写HTML 问题， js文件的文件名是固定的
![image](https://github.com/FanWorldBegin/webpack-guilde/blob/master/images/7.png)

线上的js 名称带哈希值，为了cache 让浏览器能缓存文件，提高性能，浏览器缓存文件，如果文件内容改编后浏览器不知道，会使用之前旧的文件，
为了避免这种状况，让浏览器知道文件更新重新下载。

### 2.打包输出文件带哈希值
webpack.config.js
```
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name]-[hash].bundle.js"
  },
```

### 3.运行
npm run dev
![image](https://github.com/FanWorldBegin/webpack-guilde/blob/master/images/8.png)

### 4.在HTML中动态引入
#### 1. 安装插件
  npm i --save-dev html-webpack-plugin

#### 2.配置
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // entry: "./src/index.js",
  ...
  new HtmlWebpackPlugin({
    title: 'Index',  //html 中tilte名字
    filename: 'index.html', //生成文件名字
    template: 'public/index.html', //使用的模板
    chunks: ["app"]
  })
```

#### 3.提供HTML模版
![image](https://github.com/FanWorldBegin/webpack-guilde/blob/master/images/9.png)

## 17.配置多个单页面应用
* chunks 允许添加多个html文件，分别使用不同的入口文件
* 可以理解为两个应用
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Admin',
      filename: 'admin.html',  //输出文件名字
      template: 'public/index.html', //使用哪个模板
      chunks: ["hello"]   //使用hello 编译出来的js
    }),
    new HtmlWebpackPlugin({
      title: 'Index',
      filename: 'index.html',
      template: 'public/index.html',
      chunks: ["app"]   //使用app编译出来的js
    })
  ],
  mode: 'development'
}
```

## 18. 使用 loader 来处理 CSS

### 1.安装
npm install --save-dev css-loader

### 2.配置
webpack.config.js
```javascript
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
```

### 3. 安装style-loader 需要一起使用
Adds CSS to the DOM by injecting a <style> tag
会将css 插入html
npm install style-loader --save-dev

## 19. 使用 loader 来处理 Sass 和 Less 文件

### 1.安装scss
npm install sass-loader node-sass  --save-dev
npm install style-loader css-loader --save-dev

### 2.配置
* 先执行右边的 loader  sass -css - 处理 
```javascript
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      }
    ]
  },
```

## 20. 用 mini-css-extract-plugin 把 CSS 分离成文件
打包后查看源码发现只有js 文件，通过js 控制css, 现在想要抽离css
### 1. 使用webpack插件抽离css
* mini-css-extract-plugin
* 为了避免js 文件过大，引起加载空白
* 安装
npm install --save-dev mini-css-extract-plugin

### 2.在plugin 中引入插件
webpack.config.js
* 判断是否是生产环境
const devMode = process.env.NODE_ENV !== 'production';
```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';
  plugins: [
    ...
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ],
```

### 3.配置loader
MiniCssExtractPlugin.loader 代替style-loader
![image](https://github.com/FanWorldBegin/webpack-guilde/blob/master/images/10.png)

## 21.启动服务器并实时刷新 webpack-dev-server
### 1.安装
npm install webpack-dev-server --save-dev
### 2. 修改package.json
```javascript
  "scripts": {
    "dev": "npx webpack-dev-server --open",
    "prod": "NODE_ENV=production npx webpack"
  },

```

### 3.webpack.config.js
* 读取dist 下的文件
```javascript
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
```

## 22. 用 clean-webpack-plugin 来清除文件
dist 放置编译后的文件，旧文件冗余需要清空。
### 1. 安装
npm install --save-dev clean-webpack-plugin
### 2.配置
webpack.config.js
```javascript
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new CleanWebpackPlugin()
  ]
```

## 23.如何打包图片（包含规划编译出的文件的目录结构）