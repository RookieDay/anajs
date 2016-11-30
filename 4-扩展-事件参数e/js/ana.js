(function(window, undefined) {
    var arr = [],
        push = arr.push,
        concat = arr.concat,
        slice = arr.slice;

    var ana = function(selector) {
        return ana.fn.init(selector);
    }
    ana.fn = ana.prototype = {
        contructor: ana,
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
            if (ana.isAna(selector)) {
                return this;
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
        for (var k in obj) {
            this[k] = obj[k];
        }
    }
    var select = function(selector) {
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
        select: select,
        parseHTML: parseHTML
    })

    ana.extend({
        each: function(arr, fn) {
            var l = arr.length,
                i, isArray = isLikeArray(arr);
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
                len2 = this.length;
            // objs.appendChild
            for (i = 0; len1; i++) {
                for (j = 0; j < len2; j++) {
                    node = i === len1 - 1 ?
                        this[j] : this[j].cloneNode(true);
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
                i, j, len1 = this.length,
                len2 = objs.length;
            for (i = 0; i < len2; i++) {
                for (j = 0; j < len1; j++) {
                    objs[i].inserBefore(i === len2 - 1 ?
                        this[j] : this[j].cloneNode(true), ana(objs[i]));
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
            var arr = []
            ana.each(this, function(i, v) {
                arr.push(ana.nextSibling(v));
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
    });

    // 事件模块 
    ana.Event = function(e) {
        this.event = e;
    }
    ana.Event.prototype = {
        constructor: ana.Event,
        stopPropagation: function() {
            this.event.stopPropagation();
            this.event.calceBubble = true;
        }
    }

    ana.fn.extend({
        on: function(type, callback) {
            this.each(function() {
                if (this.addEventListener) {
                    this.addEventListener(type, function(e) {
                        e = e || window.event;
                        callback.call(this, new ana.Event(e));
                    })
                } else {
                    this.attachEvent('on' + type, function(e) {
                        e = e || window.event;
                        callback.call(this, new ana.Event(e));
                    })
                }
            })
            return this;
        },
        off: function() {
            this.each(function() {
                this.removeEventListener(type, callback);
            })
            return this;
        }
    })
    ana.each(("click,mouseover," +
        "mousemove,mousedown," +
        "mouseup,keydown,keyup").split(','), function(i, v) {
        ana.fn[v] = function(callback) {
            return this.on(v, callback);
        }
    })

    window.I = window.ana = ana;
})(window);