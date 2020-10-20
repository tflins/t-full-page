
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
'use strict';

var $ = function (selector, scope) {
    if (scope === void 0) { scope = document; }
    return scope.querySelector(selector);
};

var TFullPage = /** @class */ (function () {
    function TFullPage() {
        this.init();
    }
    // 初始化
    TFullPage.prototype.init = function () {
        $('.t-full-page').style.height = document.documentElement.clientHeight + "px";
    };
    // 向下翻页
    TFullPage.prototype.down = function () {
    };
    // 向上翻页
    TFullPage.prototype.up = function () {
    };
    return TFullPage;
}());

var tFullPage = new TFullPage();
tFullPage.init();
//# sourceMappingURL=bundle.cjs.js.map
