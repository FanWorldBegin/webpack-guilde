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
