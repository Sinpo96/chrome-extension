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

config.plugins.push(new webpack.HotModuleReplacementPlugin());

const complier = webpack(config);

const app = express();

app.use(webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(complier, {
    heartbeat: 2000
}));

app.listen(9000, () => {
    console.log('server is running');
});
