			// // 构造函数
			// var ana = function(selector) {
			//     return new ana.fn.init(selector);
			// };
			// // 核心原型
			// ana.fn = ana.prototype = {
			//     constructor: ana,
			//     init: function(selector) {
			//         // 字符串: 选择器, html
			//         if (typeof selector == 'string') {
			//             if (selector.charAt(0) === '<') {
			//                 this.elements = parseHTML(selector);
			//             } else {
			//                 this.elements = select(selector);
			//             }
			//         }
			//     }
			// };
			// ana.fn.init.prototype = ana.prototype;

			// // 可扩展
			// ana.extend = ana.fn.extend = function(obj) {
			//     // 将 obj 的成员加到 this 上
			//     var k;
			//     for (k in obj) {
			//         this[k] = obj[k];
			//     }
			// };

			// var select = function(selector) {
			//     var first = selector.charAt(0),
			//         arr = [];
			//     if (first === '#') {
			//         arr.push.call(arr, document.getElementById(selector.slice(1)))
			//     } else if (first === '.') {
			//         arr.push.apply(arr, document.getElementsByClassName(selector.slice(1)))
			//     } else {
			//         arr.push.apply(arr, document.getElementsByTagName(selector));
			//     }
			//     return arr;
			// };

			// var parseHTML = function(html) {
			//     var div = document.createElement('div'),
			//         arr = [],
			//         i;
			//     div.innerHTML = html;
			//     for (i = 0; i < div.childNodes.length; i++) {
			//         arr.push(div.childNodes[i]);
			//     }
			//     return arr;
			// };

			// // 基本的工具方法
			// ana.extend({
			//     each: function(arr, fn) {
			//         var i, l = arr.length;
			//         for (i = 0; i < l; i++) {
			//             if (fn.call(arr[i], i, arr[i]) === false) {
			//                 break;
			//             }
			//         }
			//     }
			// });

			// // 判断类型的方法
			// ana.extend({
			//     isFunction: function(obj) {},
			//     isString: function(obj) {},
			//     isLikeArray: function(obj) {},
			// });

			var ana = function(selector) {
			    return new ana.fn.init(selector);
			}
			ana.fn = ana.prototype = {
			    constructor: ana,
			    init: function(selector) {
			        if (typeof selector == 'string') {
			            if (selector.charAt(0) === '<') {
			                this.elements = parseHTML(selector);
			            } else {
			                this.elements = select(selector);
			            }
			        }
			    }
			}
			ana.fn.init.prototype = ana.prototype;
			ana.extend = ana.fn.extend = function(obj) {
			    var k;
			    for (k in obj) {
			        this[k] = obj[k];
			    }
			}
			var select = function(selector) {
			    var first = selector.charAt(0),
			        arr = [];
			    if (first === '#') {
			        arr.push.apply(arr, document.getElementById(Selection.slice(1)));
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
			    for (i = 0; i < div.childNodes; i++) {
			        arr.push(div.childNodes[i]);
			    }
			    return arr;
			}
			ana.extend({
			    each: function(arr, fn) {
			        var i, l = arr.length;
			        for (i = 0; i < l; i++) {
			            if (fn.call(arr[i], i, arr[i]) === false) {
			                break;
			            }
			        }
			    }
			})

			ana.extend({
			    isFunction: function(obj) {},
			    isString: function(obj) {},
			    isLikeArray: function(obj) {}
			})