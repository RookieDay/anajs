// // 构造函数
//          var ana = function ( selector ) {
//              return new ana.fn.init( selector );
//          };
//          // 核心原型
//          ana.fn = ana.prototype = {
//              constructor: ana,
//              selector: null,
//              init: function ( selector ) {
//                  // 字符串: 选择器, html
//                  if ( typeof selector == 'string' ) {
//                      if ( selector.charAt( 0 ) === '<' ) {
//                          this.elements = parseHTML( selector );
//                      } else {
//                          this.elements = select( selector );
//                      }
//                  }
//                  this.selector = selector;
//              }
//          };
//          ana.fn.init.prototype = ana.prototype;

//          // 可扩展
//          ana.extend = ana.fn.extend = function ( obj ) {
//              // 将 obj 的成员加到 this 上
//              var k;
//              for ( k in obj ) {
//                  this[ k ] = obj[ k ];
//              }
//          };

//          var select = function ( selector ) {
//              var first = selector.charAt( 0 ), arr = [];
//              if ( first === '#' ) {
//                  arr.push.call( arr, document.getElementById( selector.slice( 1 ) ) )
//              } else if ( first === '.' ) {
//                  arr.push.apply( arr, document.getElementsByClassName( selector.slice( 1 ) ) )
//              } else {
//                  arr.push.apply( arr, document.getElementsByTagName( selector ) );
//              }
//              return arr;
//          };

//          var parseHTML = function ( html ) {
//              var div = document.createElement( 'div' ),
//                  arr = [], i;
//              div.innerHTML = html;
//              for ( i = 0; i < div.childNodes.length; i++ ) {
//                  arr.push( div.childNodes[ i ] );
//              }
//              return arr;
//          };

//          // 基本的工具方法
//          ana.extend({
//              each: function ( arr, fn ) {
//                  var i, l = arr.length, 
//                      isArray = ana.isLikeArray( arr );
//                  if ( isArray ) {
//                      // 数组
//                      for ( i = 0; i < l; i++ ) {
//                          if ( fn.call( arr[ i ], i, arr[ i ] ) === false ) {
//                              break;
//                          }
//                      }
//                  } else {
//                      // 对象
//                      for ( i in arr ) {
//                          if ( fn.call( arr[ i ], i, arr[ i ] ) === false ) {
//                              break;
//                          }
//                      }
//                  }
//                  return arr;
//              }
//          });

//          // 判断类型的方法
//          ana.extend({
//              isFunction: function ( obj ) {
//                  return typeof obj === 'function';
//              },
//              isString: function ( obj ) {
//                  return typeof obj === 'string';
//              },
//              isLikeArray: function ( obj ) {
//                  return obj && obj.length && obj.length >= 0;
//              },
//              isana: function ( obj ) {
//                  return !!obj.selector;
//              },
//              isDOM: function ( obj ) {
//                  return !!obj.nodeType;
//              }
//          });


//          // 基本的 DOM 操作
//          ana.fn.extend({
//              appendTo: function ( selector ) {
//                  // 将 this.elements 加入到 selector 中
//                  ana.each( this.elements, function () {
//                      selector.appendChild( this );
//                  } );
//              }
//          });



var ana = function(selector) {
    return new ana.fn.init(selector);
}
ana.fn = ana.prototype = {
    constructor: ana,
    selector: null,
    init: function(selector) {
        if (typeof selector === 'string') {
            if (selector.charAt(0) === '<') {
                this.elements = parseHTML(selector);
            } else {
                this.elements = select(selector);
            }
        }
        this.selector = selector;
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
        i;
    if (first === '#') {
        arr.push.apply(arr, document.getElementsByClassName(selector.slice(1)));
    } else if (first === '.') {
        arr.push.apply(arr, document.getElementById(selector.slice(1)));
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
    // 工具方法
ana.extend({
        each: function(arr, fn) {
            var i, l = arr.length,
                isArray = ana.isLikeArray(arr);
            if (isArray) {
                for (i = 0; i < arr.length; i++) {
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
        }
    })
    // 类型判断方法
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
        return !!obj.selector;
    },
    isDOM: function(obj) {
        return !!obj.nodeType;
    }
})


// 基本dom操作
ana.fn.extend({
    appendTo: function(selector) {
        ana.each(this.elements, function() {
            selector.appeChild(this);
        })
    }
})
