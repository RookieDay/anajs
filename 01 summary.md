封装each方法：
// 如果利用 get 方法获得多个元素的话, 就会得到多个数组
// 为了简化开发, 可以考虑将其合并到一个数组中
// 调用多次 get 方法, 如果想要多个数组就可以使用多个数组
// 想要一个数组, 就得到一个数组
var getTag = function(tag, results) {
    results = results || [];
    results.push.apply(results, document.getElementsByTagName(tag));
    return results;
}
var each = function(arr, fn) {
        for (var i = 0; i < arr.length; i++) {
            if (fn.call(arr[i], i, arr[i]) === false) {
                break;
            }
        }
    }
    /*
    var list1 = getTag( 'div' );
    var list2 = getTag( 'p' );
    		
    each( list1, function () {
    	this.style.backgroundColor = 'orange';
    });
    each( list2, function () {
    	this.style.backgroundColor = 'orange';
    });		
    */

each(getTag('p', getTag('div')), function(i, v) {
    this.style.backgroundColor = 'red';
})


浏览器性能检测：
var support = {};
			
			// support.getElementsByClassName = !!document.getElementsByClassName;
			// 在 jq 中不仅判断他是否存在, 还要判断其能力是否符合要求
			
			support.getElementsByClassName = (function () {
				
				var isExist = !!document.getElementsByClassName;
				
				if ( isExist && typeof document.getElementsByClassName == 'function' ) {
					// 自己创建一些元素, 并且加上 class 属性, 看是否可以获得到加上的所有元素
					var div = document.createElement( 'div' ),
						divWithClass = document.createElement( 'div' );
					
					divWithClass.className = 'c';
					div.appendChild( divWithClass );
					return div.getElementsByClassName( 'c' )[ 0 ] === divWithClass;
				
				}
				
				return false;
			})();
			
			
			if ( support.getElementsByClassName ) {
				// return node.getElementsByClassName( className );
				alert( '支持 class' );
			} else {
				// 自己实现( className );
				alert( '不支持 class' );
			}
			



common.js  -- 00
var myPush = function( target, els ) {
	var j = target.length,
		i = 0;
	// Can't trust NodeList.length
	while ( (target[j++] = els[i++]) ) {}
	target.length = j - 1;
};


// 注释: 对基本方法的封装
var getTag = function ( tag, context, results ) {
	results = results || [];
	try {
		results.push.apply( results, context.getElementsByTagName( tag ) );
	} catch ( e ) {
		myPush( results, context.getElementsByTagName( tag ) );
	}
	
	return results;
};

var getId = function ( id, results ) {
	results = results || [];
	results.push( document.getElementById( id ) );
	return results;
};

var getClass = function ( className, context, results ) {
	results = results || [];

	if ( document.getElementsByClassName ) {
		results.push.apply( results, context.getElementsByClassName( className ) );
	} else {
		each( getTag( '*', context ), function ( i, v ) {
			if ( ( ' ' + v.className + ' ' )
						.indexOf( ' ' + className + ' ' ) != -1 ) {
				results.push( v );
			}
		} );
	}
	return results;
};


// 对循环的封装
var each = function ( arr, fn ) {
	for ( var i = 0; i < arr.length; i++ ) {
		if ( fn.call( arr[ i ], i, arr[ i ] ) === false ) {
			break;
		}
	}
};
		

// 通用的方法
var get = function ( selector, context, results ) {
	results = results || [];
	context = context || document;
	//                     1          2        3       4
	var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))$/,
		m = rquickExpr.exec( selector );
	
	if ( m ) {
		if ( context.nodeType ) {
			context = [ context ];
		}
		// 如果 context 是一个 dom 数组就没有问题了
		// 但是 context 是一个选择器字符串. 有可能是 '.c'
		// 
		if ( typeof context == 'string' ) {
			context = get( context );
		}
		each( context, function ( i, v ) {
			if ( m[ 1 ] ) {
				results = getId( m[ 1 ], results );
			} else if ( m[ 2 ] ) {
				results = getClass( m[ 2 ], v, results );
			} else if ( m[ 3 ] ) {
				results = getTag( m[ 3 ], this, results );
			} else if ( m[ 4 ] ) {
				results = getTag( m[ 4 ], this, results );
			}
		} );
	}
	
	return results;
};

选择器部分的封装 select.js
// xxxxx
// 选择器引擎

var select = 

(function () {


var myPush = function( target, els ) {
	var j = target.length,
		i = 0;
	// Can't trust NodeList.length
	while ( (target[j++] = els[i++]) ) {}
	target.length = j - 1;
};


// 注释: 对基本方法的封装
var getTag = function ( tag, context, results ) {
	results = results || [];
	try {
		results.push.apply( results, context.getElementsByTagName( tag ) );
	} catch ( e ) {
		myPush( results, context.getElementsByTagName( tag ) );
	}
	
	return results;
};

var getId = function ( id, results ) {
	results = results || [];
	results.push( document.getElementById( id ) );
	return results;
};

var getClass = function ( className, context, results ) {
	results = results || [];

	if ( document.getElementsByClassName ) {
		results.push.apply( results, context.getElementsByClassName( className ) );
	} else {
		each( getTag( '*', context ), function ( i, v ) {
			if ( ( ' ' + v.className + ' ' )
						.indexOf( ' ' + className + ' ' ) != -1 ) {
				results.push( v );
			}
		} );
	}
	return results;
};


// 对循环的封装
var each = function ( arr, fn ) {
	for ( var i = 0; i < arr.length; i++ ) {
		if ( fn.call( arr[ i ], i, arr[ i ] ) === false ) {
			break;
		}
	}
};
		

// 通用的方法
var get = function ( selector, context, results ) {
	results = results || [];
	context = context || document;
	//                     1          2        3       4
	var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))$/,
		m = rquickExpr.exec( selector );
	
	if ( m ) {
		if ( context.nodeType ) {
			context = [ context ];
		}
		// 如果 context 是一个 dom 数组就没有问题了
		// 但是 context 是一个选择器字符串. 有可能是 '.c'
		// 
		if ( typeof context == 'string' ) {
			context = get( context );
		}
		each( context, function ( i, v ) {
			if ( m[ 1 ] ) {
				results = getId( m[ 1 ], results );
			} else if ( m[ 2 ] ) {
				results = getClass( m[ 2 ], v, results );
			} else if ( m[ 3 ] ) {
				results = getTag( m[ 3 ], this, results );
			} else if ( m[ 4 ] ) {
				results = getTag( m[ 4 ], this, results );
			}
		} );
	}
	
	return results;
};


var myTrim = function ( str ) {
	if ( String.prototype.trim ) {
		return str.trim();
	} else {
		return str.replace( /^\s+|\s+$/g, '' );
	}
};

var select = function ( selector, context, results ) {
	results = results || [];
	// 首先处理逗号
	var newSelectors = selector.split( ',' );   // => [ '.dv  .c1', ' .c2' ]
	each( newSelectors, function ( i, v ) {
		
		// 需要解析的就是 v 或 this
		// 分割
		var list = v.split( ' ' );
		var c = context;
		// context -> list[ 0 ] -> list[ 1 ] -> ... -> list[ length - 1 ]
		for ( var i = 0; i < list.length; i++ ) {
			if ( list[ i ] === '' ) continue; 
			c = get( list[ i ], c );
			// 如果 list[ i ] 是空字符串, 那么只是下 c 下面找空数据, 是不会报错的
		}
		
		
		results.push.apply( results, c );
		
	} );
	
	return results;
};

	
	
	
	
return select;


})();

























