# WaniKani User Script Helper

Convenience functions and data sharing for WaniKani scripts.

## Benefits

None just yet!

## Usage

* Add the loader to your tampermonkey script:

```javascript
// @require      https://curious-attempt-bunny.github.io/wanikani-user-script-helper/loader.js
```
* Wrap all your code in the initialization function:

```javascript
(function() {
    'use strict';

    window.WKHelper.init(GM_info, function() {
        // Your code here.
    });
})();
```    
