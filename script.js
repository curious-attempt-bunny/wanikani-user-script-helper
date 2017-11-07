console.log("WKHelper running!");
if (!window.WKHelper || !window.WKHelper.init_callbacks) {
    console.log("WKHelper must be loaded via the loader.js script.");
} else {
    //-------------------------------------------------------------------
    // Fetch a document from the server.
    //-------------------------------------------------------------------
    window.WKHelper.ajax_retry = function(url, options) {
        //console.log(url, retries, timeout);
        options = options || {}
        retries = options.retries || 3;
        timeout = options.timeout || 3000;
        headers = options.headers || {};

        function action(resolve, reject) {
            $.ajax({
                url: url,
                timeout: timeout,
                headers: headers
            })
            .done(function(data, status){
                //console.log(status, data);
                if (status === 'success') {
                    resolve(data);
                } else {
                    //console.log("done (reject)", status, data);
                    reject();
                }
            })
            .fail(function(xhr, status, error){
                //console.log(status, error);
                if ((status === 'error' || status === 'timeout') && --retries > 0) {
                    //console.log("fail", status, error);
                    action(resolve, reject);
                } else {
                    reject();
                }
            });
        }
        return new Promise(action);
    }

    //-------------------------------------------------------------------
    // Fetch API key from account page.
    //-------------------------------------------------------------------
    function get_api_key() {
        return new Promise(function(resolve, reject) {
            window.WKHelper.api_key_v2 = localStorage.getItem('apiKey_v2');
            if (typeof window.WKHelper.api_key_v2 === 'string' && window.WKHelper.api_key_v2.length == 36) return resolve();

            // status_div.html('Fetching API key...');
            window.WKHelper.ajax_retry('/settings/account').then(function(page) {

                // --[ SUCCESS ]----------------------
                // Make sure what we got is a web page.
                if (typeof page !== 'string') {return reject();}

                // Extract the user name.
                page = $(page);

                // Extract the API key.
                window.WKHelper.api_key_v2 = page.find('#user_api_key_v2').attr('value');
                if (typeof window.WKHelper.api_key_v2 !== 'string' || window.WKHelper.api_key_v2.length !== 36) {
                    return reject(new Error('generate_apikey'));
                }

                localStorage.setItem('apiKey_v2', window.WKHelper.api_key_v2);
                resolve();

            },function(result) {
                // --[ FAIL ]-------------------------
                reject(new Error('Failed to fetch API key!'));

            });
        });
    }

    get_api_key().then(function() {
        console.log('v2 api_key is', window.WKHelper.api_key_v2);

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
    });
}