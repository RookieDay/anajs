/*
		var g = function ( tag ) {
			return document.getElementsByTagName( tag );
		};
		
		
		var each = function ( arr, style, value ) {
			// 遍历
			for ( var i = 0; i < arr.length; i++ ) {
				arr[ i ].style[ style ] = value;
		};
	*/

// 如果你想遍历一个数组, 是要对数组做什么事情????
// 凡是涉及到遍历才可以完成的事情都应该可以做( 修改, 查询 )

var arr = [1, 2, 3, 4];

// 要求:
/*
// 1, 求和
var sum = 0;
for ( var i = 0; i < arr.length; i++ ) {
	sum += arr[ i ];
}
console.log( sum );
		
// 2, 求最大值
var max = arr[ 0 ];
for ( var i = 0; i < arr.length; i++ ) {
	if ( arr[ i ] > max ) {
		max = arr[ i ];
	}
}
console.log( max );
		
// 3, 求最小值
var min = arr[ 0 ];
for ( var i = 0; i < arr.length; i++ ) {
	if ( arr[ i ] < min ) {
		min = arr[ i ];
	}
}
console.log( min );
		
// 4, 查找 3
var find1 = -1;
for ( var i = 0; i < arr.length; i++ ) {
	if ( arr[ i ] === 3 ) {
		find1 = i;
		break;
	}
}
// 5, 查找 5
var find2 = -1;
for ( var i = 0; i < arr.length; i++ ) {
	if ( arr[ i ] === 5 ) {
		find1 = i;
		break;
	}
}
// ...		
*/

var each = function(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        fn(i, arr[i]);
    }
}
var sum = 0;
each(arr, function(i, v) {
    sum += v;
})

console.log(sum);
/*
var max = arr[ 0 ];
each( arr, function ( i, v ) {
	if ( max < v) {
		max = v;
	}
});
*/