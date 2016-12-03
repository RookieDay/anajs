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
    ana.Event = function(e) {
        this.event = e;
        // this....
    }
    ana.Event.prototype = {
        constructor: ana.Event,
        stopPropagation: function() {
            this.event.stopPropagation();
            this.event.cancelBubble = true;
        }
    }

    ana.fn.extend({
        on: function(type, callback) {
            // ana.each( this, function () { ... } )

            this.each(function() {
                if (this.addEventListener) {
                    this.addEventListener(type, function(e) {
                        e = e || window.event;
                        callback.call(this, new ana.Event(e));
                    });
                } else {
                    this.attachEvent('on' + type, function(e) {
                        e = e || window.event;
                        callback.call(this, new ana.Event(e));
                    });
                    // this[ 'on' + type ] = callback;
                }
            });
            return this; // 当前对象
        },
        off: function() {
            this.each(function() {
                this.removeEventListener(type, callback);
            });
            return this;
        }
    });

    // // 事件模块
    // ana.fn.extend({
    //     on: function(type, callback) {
    //         // ana.each( this, function () { ... } )

    //         this.each(function() {
    //             if (this.addEventListener) {
    //                 this.addEventListener(type, callback);
    //             } else {
    //                 this.attachEvent('on' + type, callback);
    //             }
    //         });
    //         return this; // 当前对象
    //     },
    //     off: function(type, callback) {
    //         this.each(function(i, v) {
    //             v.removeEventListener(type, callback);
    //         });
    //         return this;
    //     }
    // });

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

    // 内容处理模块
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
                // 将 dom 里面的所有的文本节点放到 arr 中
                var i, l = dom.childNodes.length,
                    node;
                for (i = 0; i < l; i++) {
                    node = dom.childNodes[i];
                    if (node.nodeType === 3) {
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
    });

    ana.fn.extend({
        html: function(html) {
            if (html === undefined) {
                // 返回 0 元素的 innerHTML
                return this[0].innerHTML;
            } else {
                // 设置所有的 innerHTML
                return this.each(function() {
                    this.innerHTML = html;
                });
            }
        },
        text: function(text) {
            if (text === undefined) {
                // 返回 0 元素的 innerHTML
                return ana.getInnerText(this[0]);
            } else {
                return this.each(function() {
                    ana.setInnerText(this, text);
                });
            }
        }
    });



    // 动画模块
    // 工具方法
    ana.extend({

        kv: {
            left: 'offsetLeft',
            top: 'offsetTop',
            width: 'offsetWidth',
            height: 'offsetHeight'
        },
        getDisctance: function(dom, target) {
            var o = {};
            for (var k in target) {
                o[k] = parseInt(target[k]) - dom[ana.kv[k]];
            }
            return o;
        },

        getLocation: function(dom, target) {
            var o = {};
            for (var k in target) {
                o[k] = dom[ana.kv[k]];
            }
            return o;
        },


        easings: function(x, time, startLocations, target, dur, easingName) {
            var o = {};
            for (var k in target) { // top, left ...
                o[k] = ana.easing[easingName](x, time, startLocations[k],
                    parseInt(target[k]),
                    dur);
            }
            return o;
        },

        setStyle: function(dom, startLocations, tweens, target) {
            // 给 dom 的每一个样式设置值
            for (var k in target) {
                dom.style[k] = startLocations[k] + tweens[k] + 'px';
            }
        },
        easing: {
            liner: function(x, t, b, c, d) {
                // console.log( '匀速' );
                return t * (c - b) / d;
            },
            minusspeed: function(x, t, b, c, d) {
                // 需要初始速度 和加速度
                var a = 2 * (c - b) / (d * d),
                    v_0 = a * d;
                return v_0 * t - a * t * t / 2;
            }
        }
    });


    // 动画
    ana.fn.extend({
        timerId: null,
        animate: function(target, dur, easingName) {
            easingName = easingName || 'liner';
            var dom = this[0];

            var totalDistances = ana.getDisctance(dom, target),
                startTime = +new Date,
                startLocations = ana.getLocation(dom, target),


                stepTime = 25,

                play = function() {
                    var time = +new Date - startTime, // 已过时间毫秒
                        tweens;
                    // 就是在计算 速度 * 已过时间
                    if (time >= dur) {
                        tweens = totalDistances;

                        clearInterval(this.timerId);
                        this.timerId = null;
                    } else {
                        tweens = ana.easings(null, time, startLocations, target, dur, easingName);
                    }

                    ana.setStyle(dom, startLocations, tweens, target);
                };
            play();
            this.timerId = setInterval(play, stepTime); // 50Hz
        },
        stopAnimating: function() {
            console.log(this.timerId);
            clearInterval(this.timerId);
        },
        isAnimating: function() {
            return this.timerId === null;
        }
    });








    // 对外公开
    window.I = window.ana = ana;

})(window);