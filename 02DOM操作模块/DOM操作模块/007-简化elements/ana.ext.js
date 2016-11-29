// by ana
// xxxx-xx-xx

(function(window, undefined) {


    var arr = [],
        push = arr.push,
        slice = arr.slice,
        concat = arr.concat,
        version = 'ana' + 1 * new Date();

    // 构造函数
    var ana = function(selector) {
        return new ana.fn.init(selector);
    };
    // 核心原型
    ana.fn = ana.prototype = {
        constructor: ana,
        version: version,
        selector: null,
        length: 0,
        init: function(selector) {
            // 字符串: 选择器, html
            if (typeof selector == 'string') {
                if (selector.charAt(0) === '<') {
                    // this.elements = parseHTML( selector );
                    ana.push.apply(this, parseHTML(selector));
                } else {
                    // this.elements = select( selector );
                    ana.push.apply(this, select(selector));
                }
            }
            this.selector = selector;
        }
    };
    ana.fn.init.prototype = ana.prototype;

    // 可扩展
    ana.extend = ana.fn.extend = function(obj) {
        // 将 obj 的成员加到 this 上
        var k;
        for (k in obj) {
            this[k] = obj[k];
        }
    };

    var select = function(selector) {
        var first = selector.charAt(0),
            arr = [];
        if (first === '#') {
            arr.push.call(arr, document.getElementById(selector.slice(1)))
        } else if (first === '.') {
            arr.push.apply(arr, document.getElementsByClassName(selector.slice(1)))
        } else {
            arr.push.apply(arr, document.getElementsByTagName(selector));
        }
        return arr;
    };

    var parseHTML = function(html) {
        var div = document.createElement('div'),
            arr = [],
            i;
        div.innerHTML = html;
        for (i = 0; i < div.childNodes.length; i++) {
            arr.push(div.childNodes[i]);
        }
        return arr;
    };

    // 基本的工具方法
    ana.extend({
        each: function(arr, fn) {
            var i, l = arr.length,
                isArray = ana.isLikeArray(arr);
            if (isArray) {
                // 数组
                for (i = 0; i < l; i++) {
                    if (fn.call(arr[i], i, arr[i]) === false) {
                        break;
                    }
                }
            } else {
                // 对象
                for (i in arr) {
                    if (fn.call(arr[i], i, arr[i]) === false) {
                        break;
                    }
                }
            }
            return arr;
        },
        push: push
    });

    // 判断类型的方法
    ana.extend({
        isFunction: function(obj) {
            return typeof obj === 'function';
        },
        isString: function(obj) {
            return typeof obj === 'string';
        },
        isLikeArray: function(obj) {
            return obj && obj.length && obj.length >= 0;
        },
        isana: function(obj) {
            // return !!obj.selector;
            // return !!obj && obj.version && obj.version === version;
            return !!obj && obj.version && obj.version.indexOf('ana') === 0;
        },
        isDOM: function(obj) {
            return !!obj.nodeType;
        }
    });


    // 基本的 DOM 操作
    ana.fn.extend({
        appendTo: function(selector) {
            var objs = ana(selector),
                i, j,
                len1 = objs.length,
                len2 = this.length;
            // 将 this 加到 objs 中
            for (i = 0; i < len1; i++) {
                for (j = 0; j < len2; j++) {
                    objs[i].appendChild(i === len1 - 1 ?
                        this[j] :
                        this[j].cloneNode(true));
                }
            }
        }
    });




    // 对外公开
    window.I = window.ana = ana;

})(window);