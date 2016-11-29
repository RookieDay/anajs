// 传统的处理方式, 就是使用函数获得
var g = function(tag) {
    return document.getElementsByTagName(tag);
};


// 函数化
var divs = g('div');
var ps = g('p');

// 性能
// 两个循环
// 粘过来, 改一下遍历的"数组"的名字
var each = function(arr) {
    // 遍历
    for (var i = 0; i < arr.length; i++) {
        arr[i].style.backgroundColor = 'blue';
    }
};


each(divs);
each(ps);