// // 构造函数
// var ana = function(selector) {
//     return new ana.fn.init(selector);
// };
// // 核心原型
// ana.fn = ana.prototype = {
//     constructor: ana,
//     init: function(selector) {

//     }
// };
// ana.fn.init.prototype = ana.prototype;

// // 可扩展
// ana.extend = ana.fn.extend = function(obj) {

// };


var ana = function(selector) {
    return ana.fn.init(selector);
}
ana.fn = ana.prototype = {
    constructor: ana,
    init: function(selector) {}
}
ana.fn.init.prototype = ana.prototype;
ana.extend = ana.fn.extend = function(obj) {}