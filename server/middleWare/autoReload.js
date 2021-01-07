// content-scripts 修改时的监听，让chrome刷新
const sseStream = require('ssestream').default;

module.exports = function (compiler) {
    return (req, res, next) => {
        // 允许跨域
        res.header('Access-Control-Allow-Origin', '*');
        const sse = new sseStream(req);
        sse.pipe(res);

        compiler.hooks.done.tap('extension-reload', () => {
            console.log('编译完成');
            sse.write({
                event: 'should reload',
                data: 'reload'
            })
        })
    }
}
