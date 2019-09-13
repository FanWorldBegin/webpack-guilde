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