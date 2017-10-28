console.log("WKHelper running!");
if (!window.WKHelper || !window.WKHelper.init_callbacks) {
    console.log("WKHelper must be loaded via the loader.js script.");
} else {
    window.WKHelper.init_callbacks.forEach(function(init_callback) {
        var info = init_callback.info;
        var callback = init_callback.callback;

        console.log(info, callback);
    });
}