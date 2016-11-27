// 复习
// var m = r.exec( str )
// 练习
// 写一个函数, 参数是一个字符串
// 如果参数是 # 开头 返回 id 元素
// 如果参数是 . 开头的返回 class 属性对应的元素
// 如果都不是 返回对应的标签元素


// #dv
var get = function(str) {
    if (typeof str !== 'string') throw new Error('error');

    // 是不是 #id, 或 .class, 或 tag
    var r1 = /#(.+)/;
    var r2 = /\.(.+)/;
    var m;
    if (m = r1.exec(str)) {
        return [document.getElementById(m[1])];
    } else if (m = r2.exec(str)) {
        return document.getElementsByClassName(m[1]);
    } else {
        return document.getElementsByTagName(str);
    }
};