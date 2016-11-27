// /*
// 		$( '.dv', 'body' );   => $('.dv', docuemnt.body) => $('.dv', $( 'body' ))
// 		等价于
// 		$( 'p .dv' );
// 	*/

// // get( '.dv', context, results )

// // 单独编写一个函数, 在函数中如果要获得 id, 或 tag 调用对应的方法即可
// var get = function(selector, results) {
//     results = results || [];
//     //                     1          2        3       4
//     var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))$/,
//         m = rquickExpr.exec(selector);

//     if (m) {

//         if (m[1]) {
//             results = getId(m[1], results);
//         } else if (m[2]) {
//             results = getClass(m[2], results);
//         } else if (m[3]) {
//             results = getTag(m[3], results);
//         } else if (m[4]) {
//             results = getTag(m[4], results);
//         }


//         //				if ( m[ 1 ] ) {
//         //					results = getId( m[ 1 ], results );
//         //				} else if ( m[ 2 ] ) {
//         //					results = getClass( m[ 2 ], results );
//         //				} else {
//         //					results = getTag( m[ 3 ] || "*", results )
//         //				}

//     }

//     return results;
// };


// var getTag = function(tag, results) {
//     results = results || [];
//     results.push.apply(results, document.getElementsByTagName(tag));
//     return results;
// };

// var getId = function(id, results) {
//     results = results || [];
//     results.push(document.getElementById(id));
//     return results;
// };

// var getClass = function(className, results) {
//     results = results || [];
//     results.push.apply(results, document.getElementsByClassName(className));
//     return results;
// };

// var each = function(arr, fn) {
//     for (var i = 0; i < arr.length; i++) {
//         if (fn.call(arr[i], i, arr[i]) === false) {
//             break;
//         }
//     }
// };




// each(get("*"), function() {

//     this.style.backgroundColor = 'skyblue';

// });


var get = function(selector, results) {
    results = results || [];
    var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([\w+])|(\*))/;
    var m = rquickExpr.exec(selector);
    if (m) {
        if (m[1]) {
            results = getId(m[1], results);
        } else if (m[2]) {
            results = getClass(m[2], results);
        } else if (m[3]) {
            results = getTag(m[3], results);
        } else if (m[4]) {
            results = getTag(m[4], results);
        }
        return results;
    }
}

var getId = function(id, results) {
    results = results || [];
    results.push(document.getElementById(id))
    return results;
}
var getClass = function(className, results) {
    results = results || [];
    results.push.apply(results, document.getElementsByClassName(className))
    return results;
}

var getTag = function(tag, results) {
    results = results || [];
    results.push.apply(results, document.getElementByTageName(tag));
    return results;
}

var each = function(arr, fn) {
        for (var i = 0; i < arr.length; i++) {
            if (fn.call(arr[i], i, arr[i] === false) {
                    break;
                }
            }
        }


        each(get("*"), function() {
            this.style.backgroundColor = "skyblue";
        })