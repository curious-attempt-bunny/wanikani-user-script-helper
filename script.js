console.log("WKHelper running!");
if (!window.WKHelper || !window.WKHelper.init_callbacks) {
    console.log("WKHelper must be loaded via the loader.js script.");
} else {
    window.WKHelper.init_callbacks.forEach(function(init_callback) {
        var name = 'unidentified';
        try {
            var info = init_callback.info;
            var callback = init_callback.callback;

            name = window.WKHelper.init_callbacks[0].info.script.name;
            console.log("Starting WKHelper callback for "+name+"...");
            callback(window.WKHelper);
            console.log("Completed WKHelper callback for "+name+".");
        } catch (e) {
            console.log("Error during WKHelper callback for "+name+".", e);
        }
    });
}