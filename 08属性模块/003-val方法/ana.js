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
                    ana.push.apply(this, ana.parseHTML(selector));
                } else {
                    // this.elements = select( selector );
                    ana.push.apply(this, ana.select(selector));
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


            if (ana.isFunction(selector)) {
                // window.onload = selector;
                var oldFn = window.onload;
                if (typeof oldFn === 'function') {
                    // 如果已经有了函数
                    // 我们没有办法一句话执行两个函数, 但是如果将两个函数的调用写到一个新的函数中
                    // 那么只需要调用这个新函数, 那么原来两个函数就可以调用了
                    window.onload = function() {
                        oldFn();
                        selector();
                    };
                } else {
                    window.onload = selector;
                }
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


    ana.extend({
        select: select,
        parseHTML: parseHTML
    });

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
        trim: function(str) {
            return str.replace(/^\s+|\s+$/g, '');
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
    ana.fn.extend({
        on: function(type, callback) {
            // ana.each( this, function () { ... } )

            this.each(function() {
                if (this.addEventListener) {
                    this.addEventListener(type, callback);
                } else {
                    this.attachEvent('on' + type, callback);
                }
            });
            return this; // 当前对象
        },
        off: function(type, callback) {
            this.each(function(i, v) {
                v.removeEventListener(type, callback);
            });
            return this;
        }
    });

    // 其他事件
    // click, mouseover, mousemove, mousedown, mouseup, keydown, keyup
    ana.each(("click,mouseover,mouseout,mouseenter,mouseleave," +
        "mousemove,mousedown," +
        "mouseup,keydown,keyup").split(','), function(i, v) {

        ana.fn[v] = function(callback) {
            return this.on(v, callback);
        }

    });


    // toggle 与 hover
    ana.fn.extend({
        hover: function(fn1, fn2) {
            return this.mouseover(fn1).mouseout(fn2);
        },
        toggle: function() {
            var args = arguments,
                i = 0;

            return this.click(function(e) {
                args[i++ % args.length].call(this, e);
            });

            // 1, 如何实现 点一次调用一次
            // 2, 如果实现 在传入的函数中获得事件对象 e
            // 3, 如何在传入函数中 让 this 表示当前对象
        }
    });



    // CSS 模块
    ana.fn.extend({
        css: function(cssName, cssValue) {
            if (typeof cssName == 'object') {
                // 给 this 中每一个 dom 对象都添加 样式
                return this.each(function() {
                    var k;
                    for (k in cssName) {
                        this.style[k] = cssName[k];
                    }
                });

            } else if (cssValue === undefined) {

                return window.getComputedStyle(this[0])[cssName];

            } else { // 两个参数

                // 给所有的元素都添加 该样式
                return this.each(function() {
                    this.style[cssName] = cssValue;
                });
            }
        },
        hasClass: function(cName) { // cName 可能会是 'c1 c2 c3'
            // 判断 this[ 0 ] 是否具有该类样式
            var has = false;
            ana.each(this[0].className.split(' '), function(i, v) {

                if (v === cName) {
                    has = true;
                    return false;
                }

            });
            return has;
        },
        addClass: function(cName) {
            // 给 this 中的每一个元素 追加一个类样式
            return this.each(function() {

                var className = this.className;
                className += ' ' + cName;
                this.className = ana.trim(className);
            });
        },
        removeClass: function(cName) {
            // 将 this 中每一个 DOM 对象的 className 属性中符合 cName 的删除掉
            return this.each(function() {
                this.className = ana.trim(
                    (' ' + this.className + ' ')
                    .replace(' ' + cName + ' ', ' '));
            });
        },
        toggleClass: function(cName) {
            if (this.hasClass(cName)) {
                this.removeClass(cName);
            } else {
                this.addClass(cName);
            }
        }
    });

    // 属性操作
    ana.fn.extend({
        attr: function(attName, attValue) {
            if (arguments.length == 1) {
                // img.src			HTML-DOM
                // link.href
                // setAttribute		DOM-Core
                // getAttribute

                return this[0][attName];
            } else {
                // 给每一个 dom 都添加/设置该属性值
                return this.each(function() {
                    this[attName] = attValue;
                });
            }
        },
        val: function(value) {
            if (value === undefined) {
                // 返回
                return this[0].value;
            } else {
                // 设置
                return this.each(function() {
                    this.value = value;
                });
            }
        }

    });


    // 对外公开
    window.I = window.ana = ana;

})(window);