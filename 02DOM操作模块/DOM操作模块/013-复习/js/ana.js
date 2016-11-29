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
            if (!selector) return this;
            if (ana.isString(selector)) {
                if (selector.charAt(0) === '<') {
                    ana.push.apply(this, parseHTML(selector));
                } else {
                    ana.push.apply(this, select(selector));
                    this.selector = selector;
                }
                return this;
            }
            if (ana.isDOM(selector)) {
                this[0] = selector;
                this.length = 1;
                return this;
            }
            if (ana.isAna(selector)) {
                return selector;
            }
            if (ana.isLikeArray(selector)) {
                ana.push.apply(this, selector);
                return this;
            }
        },
        each: function(callback) {
            ana.each(this, callback);
            return this;
        }
    }
    ana.fn.init.prototype = ana.prototype;

    ana.extend = ana.fn.extend = function(obj) {
        var k;
        for (k in obj) {
            this[k] = obj[k];
        }
    }

    var select = function(select) {
        var first = selector.charAt(0),
            arr = [],
            node;
        if (first === '#') {
            node = document.getElementById(selector.slice(1));
            if (node) {
                arr.push.call(arr, node);
            } else {
                return null;
            }
        } else if (first === '.') {
            arr.push.apply(arr, document.getElementsByClassName(selector.slice(1)));
        } else {
            arr.push.apply(arr, document.getElementsByTagName(selector));
        }
        return arr;
    }

    var parseHTML = function(html) {
        var div = document.createElement('div'),
            arr = [],
            i;
        div.innerHTML = html;
        for (i = 0; i < div.childNodes; i++) {
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
            return obj && obj.length && obj.length >= 0;
        },
        isAna: function(obj) {
            return 'selector' in obj;
        },
        isDOM: function(obj) {
            return !!obj.nodeType;
        }
    })
    ana.extend({
        firstChild: function(dom) {
            var node;
            ana.each(dom.childNodes, function(i, v) {
                if (this.nodeType === 1) {
                    node = this;
                    return false;
                }
            })
            return node;
        },
        nextSibling: function(dom) {
            var newDom = dom;
            while (newDom = newDom.nextSibling) {
                if (newDom.nodeType === 1) {
                    return newDom;
                }
            }
        },
        nextAll: function(dom) {
            var newDom = dom,
                arr = [];
            while (newDom = newDom.nextSibling) {
                if (newDom.nodeType === 1) {
                    arr.push(newDom);
                }
            }
            return arr;
        }
    })
    ana.fn.extend({
        appendTo: function(selector) {
            var objs = ana(selector),
                i, j, len1 = objs.length,
                len2 = this.length,
                arr = [],
                node;
            for (i = 0; i < len1; i++) {
                for (j = 0; j < len2; j++) {
                    node = i === len1 - 1 ? this[j] : this[j].cloneNode(true);
                    arr.push(node);
                    objs[i].appendChild(node);
                }
            }
            return ana(arr);
        },
        append: function(selector) {
            ana(selector).appendTo(this);
            return this;
        },
        prependTo: function(selector) {
            var objs = ana(selector),
                len1 = this.length,
                len2 = objs.length,
                i, j;
            for (i = 0; i < len2; i++) {
                for (j = 0; j < len1; j++) {
                    objs[i].insertBefore(i === len2 - 1 ? this[j] : this[j].cloneNode(true), ana.firstChild(objs[i]));
                }
            }
            return this;
        },
        prepend: function(selector) {
            ana(selector).prependTo(this);
            return this;
        },
        remove: function() {
            var i, len = this.length;
            for (i = 0; i < len; i++) {
                this[i].parentNode.removeChild(this[i]);
            }
            return this;
        },
        next: function() {
            var arr = [];
            ana.each(this, function(i, v) {
                ana.push(ana.nextSibling(v));
            })
            return ana(arr);
        },
        nextAll: function() {
            var arr = [];
            ana.each(this, function(i, v) {
                ana.push.apply(arr, ana.nextAll(v));
            })
            return ana(arr);
        }
    })
    window.I = window.ana = ana;
})(window);