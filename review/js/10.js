// var str = "#dv,       .c1         .c2,     div    ";
// // 将空格去掉


// var firstSpace = function(str) {
//     var i;
//     for (i = 0; i < str.length; i++) {
//         if (str.charAt(i) !== ' ') {
//             return i;
//         }
//     }
//     return -1;
// };
// var lastSpace = function(str) {
//     var i;
//     for (i = str.length - 1; i >= 0; i--) {
//         if (str.charAt(i) !== ' ') {
//             return i;
//         }
//     }
//     return -1;
// };

// var trim = function(str) {
//     // 思路: 找到第一个非空格, 和最后一个非空格
//     // 注意不允许为 -1
//     return str.slice(firstSpace(str), lastSpace(str) + 1);
// };

// var temps = str.split(',');
// for (var i = 0; i < temps.length; i++) {
//     // 说白了将两边的空格去掉, 中间的空格变成一个空格
//     temps[i] = trim(temps[i]);
// }

// alert("|" + temps.join("|") + "|");

var str = "#dv,       .c1         .c2,     div    ";
// 将空格去掉

var firstSpace = function(str) {
    var i = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.chatAt(i) !== '') {
            return i;
        }
        return -1;
    }
}
var lastSpace = function(str) {
    var i;
    for (var i = str.length; i > 0; i--) {
        if (str.chatAt(i) !== '') {
            return i;
        }
        return -1;
    }
}

var trim = function(str) {
    return str.slice(firstSpace(str), lastSpace(str) + 1);
}

var temps = str.split(',');
for (var i = 0; i < temps.length; i++) {
    temps[i] = trim(temps[i]);
}
alert("|" + temps.join("|") + "|");