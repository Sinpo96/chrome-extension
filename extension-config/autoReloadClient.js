// background不能引入外部的module，所以现在写死好了，如果host和port更新，这里也要随之更改
const source = new EventSource(`http://0.0.0.0:9000/__extension_auto_reload__`);

source.addEventListener(
    'open',
    () => {
        console.log('connected');
    },
    false,
);

source.addEventListener(
    'message',
    event => {
        console.log('received a no event name message, data:');
        console.log(event.data);
    },
    false,
);

source.addEventListener(
    'pause',
    () => {
        console.log('received pause message from server, ready to close connection!');
        source.close();
    },
    false,
);

source.addEventListener('extension-reload', function () {
    // 这边监听失败应该是因为entry没有配置content-scripts的原因
    console.log('extension-reload');
    chrome.runtime.reload();
});
