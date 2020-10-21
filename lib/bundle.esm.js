
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var $ = function (selector, scope) {
    if (scope === void 0) { scope = document; }
    return scope.querySelector(selector);
};
// 获取滚轮方向
var getWheelDelta = function (event) { return event.deltaY; };
// 节流函数
var throttle = function (fn, content, delay) {
    if (delay === void 0) { delay = 1000; }
    var wait = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!wait) {
            fn.apply(content, args);
            wait = true;
            setTimeout(function () {
                wait = false;
            }, delay);
        }
    };
};

var TFullPage = /** @class */ (function () {
    function TFullPage() {
        this.$container = $('.t-full-page');
        this.viewHeight = document.documentElement.clientHeight;
        this.curPosition = 0;
        this.init();
    }
    // 初始化
    TFullPage.prototype.init = function () {
        this.$container.style.height = this.viewHeight + "px";
        this.bindEvt();
    };
    // 绑定事件
    TFullPage.prototype.bindEvt = function () {
        var handleWheel = throttle(this.scrollMouse, this, 1000);
        document.addEventListener('wheel', handleWheel);
    };
    // 向下翻页
    TFullPage.prototype.down = function () {
        console.log('向下滚动');
        this.curPosition += this.viewHeight;
        this.turnPage(this.curPosition);
    };
    // 向上翻页
    TFullPage.prototype.up = function () {
        console.log('向上滚动');
        this.curPosition -= this.viewHeight;
        this.turnPage(this.curPosition);
    };
    // 翻页
    TFullPage.prototype.turnPage = function (height) {
        this.$container.style.top = height + "px";
    };
    // 鼠标滚动时
    TFullPage.prototype.scrollMouse = function (event) {
        var delta = getWheelDelta(event);
        if (delta > 0)
            this.up();
        else
            this.down();
    };
    return TFullPage;
}());

var tFullPage = new TFullPage();
//# sourceMappingURL=bundle.esm.js.map
