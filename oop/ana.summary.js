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
            arr.push(div.childNodes);
        }
        return arr; //返回获取到的DOM数组
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
            return str.replace(/^s+|\s+$/ / g, '');
        },
        push: push
    })

    ana.extend({
        isFunction: function(obj) {
            return typeof obj === 'function';
        },
        isString: function(obj) {
            return typeof obj === 'string'
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
                if (newDom.nodType == 1) {
                    return newDom;
                }
            }
        },
        nextAll: function(dom) {
            var newDom = dom,
                arr = [];
            while (newDom = newDom.nextSibling) {
                if (nodeType === 1) {
                    arr.push(newDom);
                }
            }
            return arr;
        }
    })
    ana.fn.extend({
        appendTo: function(selector) {
            var objs = ana(selector),
                i, j, node,
                len1 = objs.length,
                len2 = this.length;
            // objs.append---this
            for (i = 0; i < len1; i++) {
                for (j = 0; j < len2; j++) {
                    node = i == len1 - 1 ? this[j] : this[j].cloneNode(true);
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
                i, j,
                len1 = this.length,
                len2 = objs.length;
            // objs.app
            for (i = 0; i < len2; i++) {
                for (j = 0; j < len1; j++) {
                    objs[i].insertBefore(i === len2 - 1 ?
                        this[j] : this[j].cloneNode(true),
                        objs[i].firstChild(objs[i]));
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
                this[i].parentNode.remove(this[i]);
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
                arr.push.apply(arr, ana.nextAll(v));
            })
            return ana(arr);
        }
    })

    // 事件模块
    ana.Event = function(e) {
        this.event = e;
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
            this.each(function() {
                if (this.addEventListener) {
                    this.addEventListener(type, function(e) {
                        e = e || window.event;
                        callback.call(this, new ana.Event(e));
                    })
                } else {
                    this.attachEvent('on' + type, function(e) {
                        e = e || event;
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
            var args = arguments,
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
                    });
                } else if (cssValue === undefined) {
                    return window.getComputedStyle(this[0])[cssName];
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
                return has;
            },
            addClass: function(cName) {
                return this.each(function() {
                    var className = this.className;
                    className = ' ' + cName;
                    this.className = ana.trim(className);
                })
            },
            removeClass: function(cName) {
                return this.each(function() {
                    this.className = ana.trim((' ' + this.className + ' ').replace(' ' + cName + ' '));
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
        // 属性操作
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

    // 内容处理模块
    ana.extend({
        getInnerText: function(dom) {
            // // 获得innerHTML 移除所有标签
            // var html = dom.innerHTML + '';
            // html = html.replace(/<\/?[a-zA-Z][^>]*\/?>/g, '');
            // // 修改 &lt; 和 &gt;
            // html = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            // // 移除 注释 <!-- -->
            // // html = html.replace( /<!--[^>]*-->/g, '');
            // return html;
            // 递归获得文本节点
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
                // 先清空内容
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

    // 动画模块
    ana.extend({
        kv: {
            left: 'offsetLeft',
            top: 'offsetTop',
            width: 'offsetWidth',
            heigth: 'offsetHeight'
        },
        getDistance: function(dom, target) {
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
            for (var k in target) {
                o[k] = ana.easing[easingName](x, time, startLocations[k], parseInt(target[k]), dur);
            }
            return o;
        },
        setStyle: function(dom, startLocations, tweens, target) {
            for (var k in target) {
                dom.style[k] = startLocations[k] + tweens[k] + 'px';
            }
        },
        easing: {
            liner: function(x, t, b, c, d) {
                return t * (c - b) / d;
            },
            easeInQuad: function(x, t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOutQuad: function(x, t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOutQuad: function(x, t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            },
            easeInCubic: function(x, t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOutCubic: function(x, t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOutCubic: function(x, t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            },
            easeInQuart: function(x, t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOutQuart: function(x, t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOutQuart: function(x, t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            },
            easeInQuint: function(x, t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOutQuint: function(x, t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOutQuint: function(x, t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            },
            easeInSine: function(x, t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOutSine: function(x, t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOutSine: function(x, t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            },
            easeInExpo: function(x, t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOutExpo: function(x, t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOutExpo: function(x, t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            easeInCirc: function(x, t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOutCirc: function(x, t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOutCirc: function(x, t, b, c, d) {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            },
            easeInElastic: function(x, t, b, c, d) {
                var s = 1.70158;
                var p = 0;
                var a = c;
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (a < Math.abs(c)) { a = c; var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOutElastic: function(x, t, b, c, d) {
                var s = 1.70158;
                var p = 0;
                var a = c;
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (a < Math.abs(c)) { a = c; var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
            },
            easeInOutElastic: function(x, t, b, c, d) {
                var s = 1.70158;
                var p = 0;
                var a = c;
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                if (a < Math.abs(c)) { a = c; var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            },
            easeInBack: function(x, t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOutBack: function(x, t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOutBack: function(x, t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            },

            easeOutBounce: function(x, t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            }

        }
    })

    // I(function() {
    //     var i = I('#box');
    //     I('#btn1').click(function() {
    //         i.animate({
    //             left: '400px'
    //         }, 5000, 'minusspeed');
    //     });

    //     I('#btn2').click(function() {
    //         i.stopAnimating();
    //     });

    // })

    ana.fn.extend({
        timerId: null,
        animate: function(target, dur, easingName) {
            // animate( domDiv, 400, 1000, easing2 );
            easingName = easingName || 'liner';
            var dom = this[0];
            var totalDistances = ana.getDistance(dom, target),
                startTime = +new Date,
                startLocations = ana.getLocation(dom, target),
                stepTime = 25;
            play = function() {
                var time = +new Date - startTime,
                    tweens;
                if (time > dur) {
                    tweens = totalDistances;
                    clearInterval(this.timerId);
                    this.timerId = null;
                } else {
                    tweens = ana.easings(null, time, startLocations, target, dur, easingName);
                }
                ana.setStyle(dom, startLocations, tweens, target);
            }
            play();
            this.timerId = setInterval(play, stepTime);
        },
        stopAnimation: function() {
            // console.log(this.timerId);
            clearInterval(this.timerId);
        },
        isAnimating: function() {
            return this.timerId === null;
        }
    })
    window.A = window.ana = ana;
})(window);