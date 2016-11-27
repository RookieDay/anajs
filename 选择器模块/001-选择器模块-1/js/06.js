var arr = [1, 2, 3, 4, 3];

var each = function(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        if (fn.call(arr[i], i, arr[i]) === false) {
            break;
        }
    }
}
each(arr, function(i, v) {
    console.log(this);
})