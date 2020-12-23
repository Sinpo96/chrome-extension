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
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require('../webpack.config');
const path = require('path');
const open = require('open');
const app = express();

// 默认9000端口
const port = 9000;

// 入口处增加 webpack-hot-middleware/client?reload=true
for (let i in config.entry) {
    config.entry[i] = [config.entry[i], 'webpack-hot-middleware/client?reload=true'];
}

config.plugins.push(new webpack.HotModuleReplacementPlugin());
const complier = webpack(config);

complier.hooks.done.tap('DonePlugin',()=>{
    console.log('编译完成');
    complier.apply(new HtmlWebpackPlugin({
        filename: "popup.html",
        template: path.resolve(__dirname, '../src/index.html'),
        chunks: [ 'index' ],
        excludeChunks: [ 'background.js' ]
    }));
})

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
