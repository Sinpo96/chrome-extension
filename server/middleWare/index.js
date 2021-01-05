/**
 * @desc middleWare
 * @type {function(*=, *=): any}
 */
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const autoReload = require('./autoReload');
const webpackConfig = require('../../webpack.config');
const config = require('../config');

module.exports = function (app, compiler) {
    app.use(config.extension_auto_reload_path, autoReload(compiler));

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        writeToDisk: true
    }));

    app.use(webpackHotMiddleware(compiler, {
        heartbeat: 2000
    }));
};
