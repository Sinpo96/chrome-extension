const sseStream = require('ssestream').default;

module.exports = function (compiler) {
    return (req, res, next) => {
        const sse = new sseStream(req);
        sse.pipe(res);

        compiler.hooks.done.tap('extension-reload',()=>{
            console.log('编译完成');
            sse.write({
                event: 'should reload',
                data: 'reload'
            })
        })
    }
}
