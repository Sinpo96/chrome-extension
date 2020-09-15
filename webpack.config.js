const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = env => {
    return {
        mode: env.mode,
        entry: {
            popup: path.resolve(__dirname, './src/popup/index.js'),
            options: path.resolve(__dirname, './src/options/index.js'),
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, 'dist'),
            publicPath: "."
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                filename: "popup.html",
                template: path.resolve(__dirname, './src/popup/index.html'),
                chunks: [ 'popup' ],
                excludeChunks: [ 'background.js' ]
            }),
            new HtmlWebpackPlugin({
                filename: "options.html",
                template: path.resolve(__dirname, './src/options/index.html'),
                chunks: [ 'options' ],
                excludeChunks: [ 'background.js' ]
            }),
            new CopyPlugin({
                patterns: [
                    { from: path.resolve(__dirname, './src/extension-config/'), to: path.resolve(__dirname, 'dist') },
                    { from: path.resolve(__dirname, './images/'), to: path.resolve(__dirname, 'dist/images/') },
                ],
            })
        ]
    }
}
