// https://webpack.docschina.org/guides/development/#using-webpack-dev-middleware
/*
 * webpack 热重载配置需要三步
 * 1、每个页面入口需要添加webpack-hot-middleware/client?reload=true。
 * 2、在 webpack 配置中添加 plugin 插件new webpack.HotModuleReplacementPlugin()。
 * 3、在Express实例中添加中间件'webpack-hot-middleware'。
*/
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const open = require('open');
const webpackConfig = require('../webpack.config');
const config = require('./config');
const setUpMiddleWare = require('../server/middleWare');
const app = express();

// 默认9000端口
const port = config.port;

(function start() {
    // 入口处增加 webpack-hot-middleware/client?reload=true
    for (let i in webpackConfig.entry) {
        // 这里要配置hmr请求的地址，如果不配置，chrome就会向 chrome:extension// 请求内容，报404的错
        webpackConfig.entry[i] = [`webpack-hot-middleware/client?path=http://${config.host}:${config.port}/__extension_auto_reload__&reload=true`, webpackConfig.entry[i]];
    }
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    const compiler = webpack(webpackConfig);

    // middleware
    setUpMiddleWare(app, compiler);

    app.listen(port, () => {
        open(`http://${config.host}:${config.port}/popup.html`);
        console.log(`浏览器${port}已经启动...`);
    });
})();
