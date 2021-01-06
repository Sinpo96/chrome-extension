const source = new EventSource('http://0.0.0.0:9000/__extension_auto_reload__');

source.addEventListener('extension-reload', function () {
   alert(111111111);
});
