// by ana
// xxxx-xx-xx

(function(window, undefined) {


    var arr = [],
        push = arr.push,
        slice = arr.slice,
        concat = arr.concat;

    // 构造函数
    var ana = function ana(selector) {
        return new ana.fn.init(selector);
    };
    // 核心原型
    ana.fn = ana.prototype = {
        constructor: ana,
        selector: null,
        length: 0,
        // 假定 init 的参数
        // 1> null, "", undefined
        // 2> fn
        // 3> string -> over
        // 4> DOM 数组
        // 5> DOM 对象
        // 6> ana 对象
        init: function(selector) {

            if (!selector) return this;

            // 字符串: 选择器, html
            if (ana.isString(selector)) {
                if (selector.charAt(0) === '<') {
                    // this.elements = parseHTML( selector );
                    ana.push.apply(this, parseHTML(selector));
                } else {
                    // this.elements = select( selector );
                    ana.push.apply(this, select(selector));
                    this.selector = selector;
                }
                return this;
            }

            // DOM 对象
            if (ana.isDOM(selector)) {
                this[0] = selector;
                this.length = 1;
                return this;
            }

            // ana 对象
            if (ana.isana(selector)) {
                return selector;
            }

            // DOM 数组
            if (ana.isLikeArray(selector)) {
                ana.push.apply(this, selector);

                return this;
            }
        },
        each: function(callback) {
            ana.each(this, callback);
            return this;
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
            arr = [],
            node;
        if (first === '#') {
            node = document.getElementById(selector.slice(1));
            if (node) {
                arr.push.call(arr, node); // [ null ] 
            } else {
                return null;
            }
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
            return 'selector' in obj;
            // 'selector' in obj
            // obj.hasOwnProperty( 'selector' )
            // return obj.constructor.name === 'ana';
        },
        isDOM: function(obj) {
            return !!obj.nodeType;
        }
    });


    // 基本的 DOM 操作
    // 工具方法
    ana.extend({
        firstChild: function(dom) {
            /*var i, node, len = dom.childNodes.length;
            for ( i = 0; i < len; i++ ) {
            	node = dom.childNodes[ i ];
            	if ( node.nodeType === 1 ) {
            		return node;
            	}
            }*/


            var node;
            ana.each(dom.childNodes, function(i, v) {
                // 遍历子元素
                if (this.nodeType === 1) {
                    node = this;
                    return false;
                }
            });
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
    });
    // 实例方法
    ana.fn.extend({
        appendTo: function(selector) {
            var objs = ana(selector),
                i, j,
                len1 = objs.length,
                len2 = this.length,
                arr = [],
                node;
            // 将 this 加到 objs 中
            for (i = 0; i < len1; i++) {
                for (j = 0; j < len2; j++) {
                    node = i === len1 - 1 ?
                        this[j] :
                        this[j].cloneNode(true);
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
            // 谁加到谁上
            var objs = ana(selector),
                len1 = this.length,
                len2 = objs.length,
                i, j;
            for (i = 0; i < len2; i++) {
                for (j = 0; j < len1; j++) {
                    // 将 this[ j ] 加到 objs[ i ] 的内部的最前面
                    objs[i].insertBefore(i === len2 - 1 ?
                        this[j] :
                        this[j].cloneNode(true),
                        ana.firstChild(objs[i]));
                }
            }

            return this;
        },
        prepend: function(selector) {
            // selector 加到 this 上
            ana(selector).prependTo(this);
            return this;
        },
        remove: function() {
            // 将 this 删除
            var i, len = this.length;
            for (i = 0; i < len; i++) { // 有一个 bug
                this[i].parentNode.removeChild(this[i]);
            }

            return this;
        },
        next: function() {
            // 找到 this 的下一个元素
            var arr = [];
            ana.each(this, function(i, v) {
                arr.push(ana.nextSibling(v)); // bug
            });
            return ana(arr);
        },
        nextAll: function() {
            var arr = [];
            ana.each(this, function(i, v) {
                ana.push.apply(arr, ana.nextAll(v)); // bug
            });
            return ana(arr);
        }
    });


    // 事件模块




    // 对外公开
    window.I = window.ana = ana;

})(window);