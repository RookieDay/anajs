(function(window, undefined) {
    var arr = [],
        push = arr.push,
        slice = arr.slice;
    contact = arr.concat;
    var ana = function(selector) {
        return ana.fn.init(selector);
    };
    ana.fn = ana.prototype = {
        constructor: ana,
        selector: null,
        length: 0,
        init: function(selector) {
            if (!selector) return this;
            if (ana.isString(selector)) {
                if (selector.charAt(0) === '<') {
                    ana.push.apply(this, ana.parseHTML(html));
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
                return selector;
            }
            if (ana.isLikeArray(selector)) {
                ana.push.apply(this, selector);
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
    ana.extend = ana.fn.extend = function(obj) {
        for (var k in obj) {
            this[k] = obj[k];
        }
    }
    var select = function(selector) {
        var first = selector.charAt[0],
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
            i, arr = [];
        div.innerHTML = html;
        for (i = 0; i < div.childNodes; i++) {
            arr.push(div.childNodes[i]);
        }
        return this;
    }

    ana.extend({
        select: select,
        parseHTML: parseHTML
    })
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
        trim: function(str) {
            return str.replace(/^s+|\s+$/g, '');
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
            return obj && obj.length && obj.length >= 1;
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
            ana.each(doc.childNodes, function(i, v) {
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
    ana.extend({
        appendTo: function(selector) {
            var objs = ana(selector),
                i, j, len1 = obj.length,
                len2 = this.length;
            for (i = 0; i < len1; i++) {
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
            var obj = ana(selector),
                i, j, len1 = this.length,
                len2 = objs.length;
            for (i = 0; i < len2; i++) {
                for (j = 0; j < len1; j++) {
                    // 将 this[ j ] 加到 objs[ i ] 的内部的最前面
                    obj[i].insertBefore(i === len2 - 1 ?
                        this[j] : this[j].cloneNode(true),
                        ana.firstChild(obj[i]));
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
    })


    // 事件模块
    ana.fn.extend({
            on: function(type, callback) {
                this.each(function() {
                    if (this.addEventListener) {
                        this.addEventListener(type, callback);
                    } else if (this.attachEvent('on' + type, callback));
                })
                return this
            },
            off: function(type, callback) {
                this.each(function(i, v) {
                    v.removeEventListener(type, calback);
                })
                return this;
            }
        })
        // 其他事件
        // click, mouseover, mousemove, mousedown, mouseup, keydown, keyup
    ana.each(("click,mouseover,mouseout,mouseenter,mouseleave," +
        "mousemove,mousedown," +
        "mouseup,keydown,keyup").split(','), function(i, v) {

        ana.fn[v] = function(callback) {
            return this.on(v, callback);
        }

    })
    ana.fn.extend({
        hover: function(fn1, fn2) {
            return this.mouseover(fn1).mouseout(fn2);
        },
        toggle: function() {
            var args = arguments.length,
                i = 0;
            return this.click(function(e) {
                args[i++ % args.length].call(this, e);
            })
        }
    })
    ana.fn.extend({
        css: function(cssName, cssValue) {
            if (typeof cssName == 'object') {
                return this.each(function() {
                    var k;
                    for (k in cssName) {
                        this.style[k] = cssName[k];
                    }
                })
            } else if (cssValue === undefined) {
                return window.getComputedStyle(this[0]);
            } else {
                return this.each(function() {
                    this.style[cssName] = cssValue;
                })
            }
        },
        hasClass: function(cName) {
            var has = false;
            ana.each(this[0].className.split(' '), function(i, v) {
                if (v === cName) {
                    has = true;
                    return false;
                }
            })
            return this;
        },
        addClass: function(cName) {
            return this.each(function() {
                var className = this.className;
                className += ' ' + cName;
                this.className = ana.trim(className);
            })
        },
        removeClass: function(cName) {
            return this.each(function() {
                this.className = ana.trim((' ' + this.className + ' ').replace(' ' + cName + ' ', ' '));
            })
        },
        toggleClass: function(cName) {
            if (this.hasClass(cName)) {
                this.removeClass(cName);
            } else {
                this.addClass(cName);
            }
        }
    })

    ana.fn.extend({
        attr: function(attName, attValue) {
            if (arguments.length == 1) {
                return this[0][attName];
            } else {
                return this.each(function() {
                    this[attName] = attValue;
                })
            }
        },
        val: function(value) {
            if (value === undefined) {
                return this[0].value;
            } else {
                return this.each(function() {
                    this.value = value;
                })
            }
        }
    })

    ana.extend({
        getInnerText: function(dom) {
            var list = [];
            if (dom.innerText !== undefined) {
                return dom.innerText;
            } else {
                getTextNode(dom, list);
                return list.join('');
            }

            function getTextNode(dom, arr) {
                var i, l = dom.childNodes.length,
                    node;
                for (i = 0; i < l; i++) {
                    node = dom.childNodes[i];
                    if (nodeType === 3) {
                        arr.push(node.nodeValue);
                    } else {
                        getTextNode(node, arr);
                    }
                }
            }
        },
        setInnerText: function(dom, str) {
            if ('innerText' in dom) {
                dom.innerText = str;
            } else {
                dom.innerHTML = "";
                dom.appendChild(document.createTextNode(str));
            }
        }
    })

    ana.fn.extend({
        html: function(html) {
            if (html === undefined) {
                return this[0].innerHTML;
            } else {
                return this.each(function() {
                    this.innerHTML = html;
                })
            }
        },
        text: function(text) {
            if (text === undefined) {
                return ana.getInnerText(this[0]);
            } else {
                return this.each(function() {
                    ana.setInnerText(this, text);
                })
            }
        }
    })
    window.I = window.ana = ana;
})(window);