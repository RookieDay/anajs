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


