const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = env => {
    return {
        mode: env.mode,
        entry: {
            index: path.resolve(__dirname, './src/index.js')
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, 'dist'),
            publicPath: ""
        },
        resolve: {
            alias: {
                '@components': path.resolve(__dirname, './src/components'),
                '@pages': path.resolve(__dirname, './src/pages')
            }
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                filename: "popup.html",
                template: path.resolve(__dirname, './src/index.html'),
                chunks: [ 'index' ],
                excludeChunks: [ 'background.js' ]
            }),
            new CopyPlugin({
                patterns: [
                    { from: path.resolve(__dirname, './extension-config/'), to: path.resolve(__dirname, 'dist') },
                    { from: path.resolve(__dirname, './images/'), to: path.resolve(__dirname, 'dist/images/') },
                ],
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader',
                    exclude: /node_modules/,
                }
            ]
        }
    }
}
