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
			var ana = function(selector) {
			    return ana.fn.init(selector);
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
			ana.extend = ana.fn.extend = function(obj) {}
			var select = function(selector) {
			    var first = selector.charAt(0),
			        arr = [];
			    if (first === '#') {
			        arr.push.apply(arr, document.getElementById(selector.slice(1)));
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