window.WKHelper = window.WKHelper || {};
window.WKHelper.init_callbacks = window.WKHelper.init_callbacks || [];
window.WKHelper.init = function(gm_info, callback) {
    init_callbacks.push({info: gm_info, callback: callback})
}

var scriptElement = document.createElement('script');
console.dir(scriptElement);
scriptElement.setAttribute("type","text/javascript")
scriptElement.setAttribute("src", "https://raw.githubusercontent.com/curious-attempt-bunny/wanikani-user-script-helper/master/script.js")