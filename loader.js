console.log("Loader for WKHelper running!");
window.WKHelper = window.WKHelper || {};
window.WKHelper.init_callbacks = window.WKHelper.init_callbacks || [];
window.WKHelper.init = function(gm_info, callback) {
    window.WKHelper.init_callbacks.push({info: gm_info, callback: callback})
};

(function(d, s, id) {
  var js, finaljs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    console.log("WKHelper script already appended.");
    return;
  }
  console.log("Appending WKHelper script...");
  js = d.createElement(s);
  js.id = id;
  js.src = "//curious-attempt-bunny.github.io/wanikani-user-script-helper/script.js";
  finaljs.parentNode.insertBefore(js, finaljs);
}(document, 'script', 'wanikani-user-script-helper'));
