// https://webpack.docschina.org/guides/development/#using-webpack-dev-middleware
/*
 * webpack 热重载配置需要三步
 * 1、每个页面入口需要添加webpack-hot-middleware/client?reload=true。
 * 2、在 webpack 配置中添加 plugin 插件new webpack.HotModuleReplacementPlugin()。
 * 3、在Express实例中添加中间件'webpack-hot-middleware'。
*/
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');
const open = require('open');
config.plugins.push(new webpack.HotModuleReplacementPlugin());
const complier = webpack(config);
const app = express();

// 默认9000端口
const port = 9000;

app.use(webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath,
    writeToDisk: true
}));

app.use(webpackHotMiddleware(complier, {
    heartbeat: 2000
}));

app.listen(port, () => {
    open(`http://0.0.0.0:${port}/popup.html`);
    console.log(`浏览器${port}已经启动...`);
});
