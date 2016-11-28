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



DOM模块 核心模型
 // createElement 可以创建 HTML 的 DOM 对象

        // <DOM 对象>.appendTo( ... )

        // 原则: 不要直接的修改原生的内置对象的成员

        // 也就是说 DOM 对象不应该提供 appendTo 方法

        // 谁添加该方法?
        // -> DOM对象		错误
        // -> 原型对象		jq 对象的原型对象; 包装对象( 自定义对象 )的原型对象
        // -> jq 对象

        // $( '...' ).appendTo( $( 'body' ) )
        // 框架的结构
        //			var ana = function ( selector ) {
        //				return new F( selector );
        //			};
        //			var F = function ( selector ) {
        //				
        //			};
        //			F.prototype = {
        //				appendTo: function( selector ) {}
        //			};

        // 缺点???
        // 首先在沙箱中 F 对外不可见, 无法实现扩展
        // 同时在描述中容易造成多个变量暴漏与全局中

        // 解决方案, 直接将 F 绑定到 ana 的上面
        // -> ana.init = F
        // -> ana.prototype.init = F
        // 如果想要扩展
        // -> ana.init.prototype.xx = xxx;

        // 由于在方法中提供的方法一般是静态方法, 作为工具使用
        // 但是 jq 中并不是如此操作
        // 同时根据代码的组织规范, 初始化方法放在原型中更加合理( 与实例相关 )

        var ana = function(selector) {
            return new ana.prototype.init(selector);
        };
        ana.prototype = {
            appendTo: function(selector) {},
            init: function(selector) {}
        };

        ana.prototype.init.prototype = ana.prototype; 



节点复制：
// 将问题简化
			I( '<div></div><div></div>' ).appendTo( 'div' );
			
			// 将一个 div 数组( 2 个元素 ) 添加到 页面中的 div 中( 2 个 )
			// [ d1, d2 ]						[ div1, div2 ]
			// 将 d1 加到 div1 和 div2 中
			// 将 d2 加到 div1 和 div2 中
			
			// 单个元素要克隆几个由需要添加的元素个数决定, 刚刚是需要添加的个数 - 1
			
			// 再简化
			// 将 dv 加到 [ div1, div2, div3 ] 中
			/*
			div1.appendChild( dv.cloneNode( true ) );
			div2.appendChild( dv.cloneNode( true ) );
			div3.appendChild( dv );
			*/
			
			// 最后一个不克隆, 前面的所有都要克隆
			/*
			for ( var i = 0; i < list.length; i++ ) {
				list[ i ].appendChild( i === list.length - 1 ?
										dv : 
										dv.cloneNode( true ) );
			}
			*/
			
			
			
			// 接下来讨论两个循环
			// ds = [ d1, d2 ]						list = [ div1, div2, dv3 ]
			div1.appendChild( d1.cloneNode( true ) );
			div1.appendChild( d2.cloneNode( true ) );
			
			div2.appendChild( d1.cloneNode( true )  );
			div2.appendChild( d2.cloneNode( true )  );
			
			div3.appendChild( d1 );
			div3.appendChild( d2 );
			
			// 添加一层循环
			for ( var i = 0; i < ds.length; i++ ) {
				div1.appendChild( ds[ i ].cloneNode( true ) );
			}
			for ( var i = 0; i < ds.length; i++ ) {
				div2.appendChild( ds[ i ].cloneNode( true ) );
			}
			for ( var i = 0; i < ds.length; i++ ) {
				div3.appendChild( ds[ i ] );
			}
			// 合并
			for ( var j = 0; j < list.length; j++ ) {
				for ( var i = 0; i < ds.length; i++ ) {
					list[ j ].appendChild( j === list.length - 1 ? 
												ds[ i ] : 
												ds[ i ].cloneNode( true ) );
				}
			}



创建子节点的问题：
// jq 中
// $( '<div style=""></div>' );

// itcast -> I
// var dom = I( '<a href="http://www.baidu.com">一个链接</a>' )

var cElem = function(html) {
    // 1, 在内部创建一个 docfrag
    var docfrag = document.createDocumentFragment();
    // 2, 创建真正的 div, 然后设置其 innerHTMl 为出入的字符串
    // 然后在遍历该子元素, 将内容加入到 docfrag 中
    var div = document.createElement('div');
    // 3, 将字符串设置为 它的 innerHTML
    div.innerHTML = html;
    // 4, 遍历div的子元素, 加入 docfrag
    // 在 DOM 元素中默认有一个特征, 即元素只允许有一个 父节点
    // 如果添加元素到另一个节点中, 该元素会自动的离开原来的父节点
    while (div.firstChild) {
        docfrag.appendChild(div.firstChild);
    }
    // 5, 获得其子元素返回
    return docfrag;
}; 
以下是理解方式:
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script type="text/javascript">
			
			var id = function ( id ) {
				return document.getElementById( id );
			};
			
			
			onload = function () {
				var d1 = id( 'dv1' );
				var d2 = id( 'dv2' );
				var list = d1.getElementsByTagName("p");
				var len;
//				for ( var i = 0, len = list.length; i < len; i++ ) {
//					
//					d2.appendChild( list[ 0 ] );
//					
//				}
				
//				while ( list[ 0 ] ) {
//					d2.appendChild( list[ 0 ] );
//				}
				
				while ( d1.firstChild ) {
					d2.appendChild( d1.firstChild );
				}
			};
			
		</script>
	</head>
	<body>
		<div id="dv1">
			<p>p1</p>
			<p>p2</p>
			<p>p3</p>
			<p>p4</p>
		</div>
		<div id="dv2">
			
		</div>
	</body>
</html>














