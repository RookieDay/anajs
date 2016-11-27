var arr = [1, 2, 3, 4, 3];

var each = function(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        if (fn(i, arr[i]) == false) {
            break;
        }
    }
}

var index = -1;
each(arr, function(i, v) {
    if (v === 3) {
        index = i;
        return false;
    }
    return 2;
});

console.log(index);