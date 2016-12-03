(function(window, undefined) {
    var arr = [],
        push = arr.push,
        concat = arr.concat,
        slice = arr.slice;
    var ana = function ana(selector) {
        return new ana.fn.init(selector);
    }
    ana.fn = ana.prototype = {
        constructor: ana,
        selector: null,
        length: 0,
        init: function(selector) {
            if (!selector) return this;
            if (ana.isString(selector)) {
                if (selector.charAt(0) === '<') {
                    ana.push.apply(this, ana.parseHTML(selector));
                } else {
                    ana.push.apply(this, ana.select(selector));
                    this.selector = selector;
                }
                return this;
            }
            if (ana.isDOM(selector)) {
                this[0] = selector;
                this.length = 1;
                return this;
            }
            if (ana.isana(selector)) {
                return selector;
            }
            if (ana.isLikeArray(selector)) {
                arr.push.apply(this, selector);
                return this;
            }
            if (ana.isFunction(selector)) {
                var oldFn = window.onload;
                if (typeof oldFn === 'function') {
                    window.onload = function() {
                        oldFn();
                        selector();
                    }
                } else {
                    window.onload = selector;
                }
            }
        },
        each: function(callback) {
            ana.each(this, callback);
            return this;
        }
    }
    ana.fn.init.prototype = ana.prototype;
    ana.fn.extend = ana.extend = function(obj) {
        for (var k in obj) {
            this[k] = obj[k];
        }
    };
})(window);