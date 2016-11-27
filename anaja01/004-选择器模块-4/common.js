
// 注释: 对基本方法的封装
var getTag = function ( tag, context, results ) {
	results = results || [];
	context = context || document;
	
	results.push.apply( results, context.getElementsByTagName( tag ) );
	return results;
};

var getId = function ( id, results ) {
	results = results || [];
	results.push( document.getElementById( id ) );
	return results;
};

var getClass = function ( className, context, results ) {
	results = results || [];
	context = context || document;
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
	//                     1          2        3       4
	var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))$/,
		m = rquickExpr.exec( selector );
	
	if ( m ) {
		
		if ( m[ 1 ] ) {
			results = getId( m[ 1 ], results );
		} else if ( m[ 2 ] ) {
			results = getClass( m[ 2 ], context, results );
		} else if ( m[ 3 ] ) {
			results = getTag( m[ 3 ], context, results );
		} else if ( m[ 4 ] ) {
			results = getTag( m[ 4 ], context, results );
		}
		
	}
	
	// 原生字符串的方法
	/*
	 
	 if (selector === '*') {
	  	
	  	return ...
	 }
	 var firstChar = selector.charAt( 0 );
	 switch( firstChar ) {
	 	case '#': selector.slice( 1 ); break;
	 	case '.': break;
	 	default: break;
	 }
	 
	 
	 
	 
	 */
	
	
	
	return results;
};


























