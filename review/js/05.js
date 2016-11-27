var get = function(str) {

    // 是不是 #id, 或 .class, 或 tag
    // 使用首尾约束, 可以严格匹配数据

    // 能够作为名字的数据( W3C 组织中有严格的规定 )
    // 现在简化, 就是字面与数字
    // [a-zA-Z0-9_\-]
    var r1 = /^#([a-zA-Z0-9_\-]+)$/;
    var r2 = /^\.([a-zA-Z0-9_\-]+)$/;
    var r3 = /^[a-zA-Z0-9_\-]/;
    var m;
    if (m = r1.exec(str)) {
        return [document.getElementById(m[1])];
    } else if (m = r2.exec(str)) {
        return document.getElementsByClassName(m[1]);
    } else {
        return document.getElementsByTagName(str);
    }
};