(function(window, undefined) {
    var arr = [],
        push = arr.push,
        slice = arr.slice,
        concat = arr.concat,
        version = 'ana' + 1 * new Date();
    var ana = function(selector) {
        return new ana.fn.init(selector);
    }
    ana.fn = ana.prototype = {
        constructor: ana,
        selector: null,
        length: 0,
        init: function(selector) {
            if (typeof selector == 'string') {
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
    ana.extend = ana.fn.extend = function(obj) {
        for (var k in obj) {
            this[k] = obj[k];
        }
    }
    var select = function(selector) {
        var first = selector.charAt(0),
            arr = [];
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
        for (i = 0; i < div.childNodes.length; i++) {
            arr.push(div.childNodes[i]);
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
            return arr;
        },
        push: push
    });
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
        isAna: function(obj) {
            return !!obj && obj.version && obj.version.indexOf('ana') === 0;
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
                    objs[i].appendChild(i === len1 - 1 ?
                        this[j] :
                        this[j].cloneNode(true));
                }
            }
        }
    })
    window.I = window.ana = ana;
})(window);