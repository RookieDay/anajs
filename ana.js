// by ana
// xxxx-xx-xx

(function(window, undefined) {

    var arr = [],
        push = arr.push,
        slice = arr.slice,
        concat = arr.concat;
    var loadEvent = [];
    window.onload = function() {
            for (var i = 0; i < loadEvent.length; i++) {
                loadEvent[i]();
            }
        }
        //目的 onload可以累加
        // I(fn1) 在框架中最早 onload = fn
        // I(fn2) 但是我们希望的是 先调用fn1 在调用fn2

    // 借助addEventListener
    // 使用数组 存取每次加入的函数 只要onload将数组中的函数 依次遍历执行即可
    // 经典
    // var oldFn = window.onload;
    // if(typeof oldFn === 'function') {
    // 	如果已经有了函数
    // 	我们没有办法一句话执行两个函数  但是如果将两个函数调用写到
    // 	一个新的函数里，那么只需要调用这个新函数 那么原来的两个函数就可以调用了
    // 	window.onload =  function() {
    // 		oldFn();
    // 		fn();  现在只是把函数赋给了我们的Onload 只有在页面全部加载
    // 				完以后才会调用我们的函数 
    // 缺点就是fn 里面的this 指的是window 函数调用 每个控件都有Onload
    // 现在是window绑定的onload 将来也可能是image绑定onload 
    // 所以我们的Onload不一定绑到window 上 将来可能绑到Image上 
    //这时 这个function里面的this就是Image 但是function里面的这个两个
    //函数时函数调用模式 这两个函数的this指向window 所以这个funciotn 里面的函数调用的
    //他们的this有问题， 所以 需要fix一下， 使用上下文调用	使用apply 或者call	
    // 	};
    // }	else {
    // 	window.onload = fn;
    // }	
    //这里的function ( ) { }是系统调用的 ， 我们没法控制， 但是里面调用的函数
    //我们是可以控制的


    //有的返回this 有的返回ana(arr)
    //正常情况下链式编程 $("#div").css('border','1px solid red').css(...) 可以返回我们的放弃对象
    //但是有些时候我们的 链式编程会被破坏 比如
    // $('<div></div>').appendTo('li')  举例 li 是我们列表元素里面的每一项 列表元素
    //可能有多个 也可能有一个 ， 前面我们的jq对象 $('<div></div>') 只有一个dom对象
    //如果返回this就返回一个　假如我们的页面上有两个li  此时appendTo 将我们原来的
    //一个div dom对象变成了两个div dom对象  如果将来我们在这里继续调用css方法
    //$('<div></div>').appendTo('li').css(..)  假设我们现在有两个div了编号是1 2 
    //那么我的这个css应该是给哪一个div加样式-- 这里的话应该是都加 ， 那么既然是都加
    // 如果是都加的话 那么我的appaendTo这个方法能不能返回this ? 如果我们的
    //jq 对象是一个div标签的话， 那么appenTo返回就是一个div  但是我的appenTo li 是有
    //两个div存在的 所以 需要返回的是数组， 如果直接返回数组的话 是没有css这个方法的
    // 所以需要使用ana这个函数 将我们的数组包装一下  

    //prependTo 返回的也是数组  prepend 是将 返回的是this
    //我们所说的链式编程是返回最前面的东西 也就是 $('div')
    //append   $('div').append('<div></d iv>').css(...)  append 不改变我的
    //当前对象结构 就只是给我的当前对象加东西了 所以直接返回this就可以
    //prepend 
    //appendTo 为什么返回的是数组呢 因为我们的链式编程破坏了


    // 构造函数
    var ana = function(selector) {
        return new ana.fn.init(selector);
    };
    //ana.fn.extend 是给我们的原型添加 使得我们的对象 实例有这个成员
    //ana.extend 是给我们的函数添加 作为工具和方法
    // 核心原型
    ana.fn = ana.prototype = {
        constructor: ana, //得到和原型结构一模一样的
        selector: null,
        length: 0,
        init: function(selector) {
            if (!selector) return this;
            // 字符串: 选择器, html
            if (ana.isString(selector)) {
                if (selector.charAt(0) === '<') {
                    //好处 数据和方法 分离
                    // this.elements = parseHTML( selector );
                    ana.push.apply(this, ana.parseHTML(selector));
                } else {
                    //让我的select 对外公开 所以将其绑定到我们的ana上面
                    ana.push.apply(this, ana.select(selector));
                    this.selector = selector;
                }
                return this;
            }
            if (ana.isDOM(selector)) {
                this[0] = selector;
                this.length = 1;
            }
            if (ana.isana(selector)) {
                return selector;
            }
            if (ana.isLikeArray(selector)) {
                ana.push.apply(this, selector);
            }
            if (ana.isFunction(selector)) {
                //window.onload = selector;
                // if(window.addEventListener) {
                // 	window.addEventListener('load',selector);
                // } else {
                // 	window.attachEvent('load',selector);
                // }
                loadEvent.push(selector);
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
                arr.push.call(arr, node)
            } else {
                return null
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
            return 'selector' in obj;
        },
        isDOM: function(obj) {
            return !!obj.nodeType;
        }
    });

    //工具方法
    ana.extend({
        firstChild: function(dom) {
            // var i , node ,len = dom.childNodes.length;
            // for( i = 0; i < len; i++) {
            // 	node = dom.childNodes[i]; //涉及原型链搜索
            // 	if(node.nodeType == 1 ) {
            // 		return node;
            // 	}
            // }

            var node;
            ana.each(dom.childNodes, function(i, v) {
                // if(v.nodeType )
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
            while (newDom = newDom.nextSibiling) {
                if (newDom.nodeType === 1) {
                    arr.push(newDom);
                }
            }
            return arr;
        }
    });

    //实例方法
    // 基本的 DOM 操作
    ana.fn.extend({
        appendTo: function(selector) {
            // var objs = ana( selector ).elements,
            // 	i, j,
            // 	len1 = objs.length,
            // 	len2 = this.elements.length;
            // // 将 this.elements 加到 objs 中
            // for ( i = 0; i < len1; i++ ) {
            // 	for ( j = 0; j < len2; j++ ) {
            // 		objs[ i ].appendChild( i === len1 - 1 ? 
            // 								this.elements[ j ] :
            // 								this.elements[ j ].cloneNode( true ) );
            // 	}
            // }
            var objs = ana(selector),
                i, j,
                len1 = objs.length,
                len2 = this.length,
                arr = [],
                node;
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
            var objs = ana(selector),
                len1 = this.length,
                len2 = objs.length,
                i, j;
            for (i = 0; i < len2; i++) {
                for (j = 0; j < len1; j++) {
                    objs[i].insertBefore(i === len2 - 1 ?
                        this[j] :
                        this[j].cloneNode(true),
                        ana.firstChild(objs[i]));
                }
            }
            return this;

        },
        prepend: function(selector) {
            ana(selector).prependTo(this);
            return this;
        },
        remove: function(selector) {
            //如果获取的元素 是连续存放的div的话 这个length 会有问题
            var i, len = this.length;
            for (i = 0; i < len; i++) {
                this[i].parentNode.removeChild(this[i]);
            }

            return this;
        },
        next: function() {
            var arr = [];
            ana.each(this, function(i, v) {
                arr.push(ana.nextSibling(v)); //bug
            });
            return ana(arr);
        },
        nextAll: function() {
            var arr = [];
            ana.each(this, function(i, v) {
                ana.push.apply(arr, ana.nextAll(v)); //bug
            });
            return ana(arr);
        }
    });

    ana.Event = function(e) {
        this.event = e;

    };

    ana.Event.prototype = {
        constructor: ana.Event,
        stopPropagation: function() {
            this.event.stopPropagation();
            this.event.cancelBuble = true;
        }
    }

    //事件模块
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

    //我的
    // ana.fn.extend({
    // 	on:function(type,callback) {
    // 			//ana.each(this,function({}))
    // 			this.each( function () {
    // 				if ( this.addEventListener ) {
    // 					this.addEventListener( type, function(e) {
    // 						e = e || window.event;
    // 						callback.call(this,new ana.Event(e));
    // 					} );
    // 				} else {
    // 					this.attachEvent( 'on' + type, function(e) {
    // 						e = e || window.event;
    // 						callback.call(this,new ana.Event(e));
    // 					} );
    // 				}
    // 			});
    // 			return this; // 当前对象
    // 	},
    // 	off: function ( type, callback ) {
    // 		this.each( function ( i, v ) {
    // 			v.removeEventListener( type, callback );
    // 		});
    // 		return this;
    // 	}
    // });



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

    // 对外公开
    window.I = window.ana = ana;

})(window);







//动态方法： 
//动态特性：对象点的方式给对象随时随地添加成员 给对象添加方法 和熟悉下
//实例方法： 由构造函数创建出来的对象点出来的方法 
//静态方法：构造函数点出来的方法

// 我们的
// ana
// ana.prototype.init  都是同一个构造方法 因为他们两个的原型是一样的 创建出出来的对象就是一样的
//

//前面这创建的可能是一个dom对象  但是后面变成了 假如有三个
// div,那就变成了三个dom对象    返回的就不再是this了 返回的是一个另一个JQ 有三个同样
// 元素的JQ对象
// $(...).appendTo('div')
// 链的破坏 --- 你返回this了