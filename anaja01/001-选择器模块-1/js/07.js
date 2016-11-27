var getTag = function(tag) {
    return document.getElementsByTagName(tag);
}
var each = function(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        if (fn.call(arr[i], i, arr[i]) === false) {
            break;
        }
    }
}
var list1 = getTag('div');
var list2 = getTag('p');
each(list1, function(i, v) {
    this.style.backgroundColor = 'green';
})
each(list2, function(i, v) {
    this.style.backgroundColor = 'pink';
})