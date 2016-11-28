(function(window, undefined) {
    var arr = [],
        push = arr.push,
        slice = arr.slice,
        concat = arr.concat;

    var ana = function(selector) {
        return new ana.fn.init(selector);
    }
    ana.fn = ana.prototype = {
        constructor: ana,
        selector: null,
        length: 0,
        init: function(selector) {
            if (typeof selector == 'str') {
                if (selector.charAt(0) === '<') {
                    ana.push.apply(this, parseHTML(selector));
                } else {
                    ana.push.apply(this, select(selector));
                }
            }
            this.selector = selector;
        }
    }
    ana.fn.init.prototype = ana.prototype;

    // 可扩展
    ana.extend = ana.fn.extend = function(obj) {
        for (var k in obj) {
            this[k] = obj[k];
        }
    }
    var select = function(selector) {
        var first = selector.charAt(0),
            arr - [];
        if (first === '#') {
            arr.push.call(arr, document.getElementById(selector.slice(1)));
        } else if (first === '.') {
            arr.push.apply(arr, document.getElementsByClassName(selector.slice(1)));
        } else {
            arr.push.apply(arr, document.getElementsByTagName(selector.slice(1)));
        }
        return arr;
    }
    var parseHTML = function(html) {
        var div = document.createElement('div'),
            arr = [],
            i;
        div.innerHTML = html;
        for (i = 0; i < div.childNodes; i++) {
            arr.push(div.childNodes);
        }
        return arr;
    }
    ana.extend({
        each: function(arr, fn) {
            var i, l = arr.length,
                isArray = ana.isLikeArray(arr);
            if (isArray) {
                for (i = 0; i < l; i++) {
                    if (fn.call(arr[i], i, arr[i]) === false) {
                        break;
                    }
                }
            } else {
                for (i in arr) {
                    if (fn.call(arr[i], i, arr[i]) === false) {
                        break;
                    }
                }
            }
        },
        push: push
    })
    ana.extend({
        isFunction: function(obj) {
            return typeof obj === 'function';
        },
        isString: function(obj) {
            return typeof obj === 'string';
        },
        isLikeArray: function(obj) {
            typeof obj && obj.length && obj.length >= 0;
        },
        isAna: function(obj) {
            return !!obj.selector;
            // 'slector' in obj 
            // obj.hasOwnProperty('selector')
            // return obj.constructor.name === 'ana'
        },
        isDOM: function(obj) {
            return !!obj.nodeType;
        }
    })

    ana.fn.extend({
        appendTo: function(selector) {
            var objs = ana(selector),
                i, j, len1 = objs.length,
                len2 = this.length;
            for (i = 0; i < len1; i++) {
                for (j = 0; j < len2; j++) {
                    objs[i].appendChild(i === len1 ?
                        this[j] :
                        this[j].cloneNode(true));
                }
            }
        }
    })


    window.I = window.ana = ana;
})(window);