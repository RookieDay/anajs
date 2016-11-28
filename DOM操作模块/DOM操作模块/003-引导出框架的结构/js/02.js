// 简单的实现以下, selector 可以是 html 字符串, 也可以是 选择器

var ana = function(selector) {
    return new F(selector);
};
var F = function(selector) { // string, dom, array, func, ...
    if (typeof selector === 'string') {
        if (selector.charAt(0) === '<') {
            // html 字符串
            this.elements = cElem(selector);
        } else {
            // 选择器
            this.elements = select(selector);
        }
    }
}
F.prototype = {
    constructor: F,
    appendTo: function(abc) {
        // 是将 this.elements 加到 selector 上面
        abc.appendChild(this.elements);
    },
    after: function() {}
}