var get = function(str) {
    if (typeof str != 'string') throw new Error('erro');
    var r1 = /#(.+)/;
    var r2 = /\.(.+)/;
    var m;
    if (m = r1.exec(str)) {
        return [document.getElementById(m[1])];
    } else if (m = r2.exec(str)) {
        return document.getElementsByClassName(m[1]);
    } else {
        return document.getElementByTagName(str);
    }
}

var list = get('.div #dv');
// 我们在查找数据的时候, 有一个约束
// 就是简单的选择器字符串一定是匹配 # 开头, id 名结尾
// . 开头, 类名结尾
// 仅仅包含标签名的情况
// 
// "#dv", ".c", "div", "*"
// ".c div>.cc"