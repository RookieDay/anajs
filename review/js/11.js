var str = "#dv,       .c1         .c2,     div    ";


// // replace( str, str );
// // replace( regexp, str );

// // trim
// var trim = function(str) {
//     return str.replace(/^\s+|\s+$/g, "");
// };

// // var s = "             123           ";
// // alert( "|" + trim( s ) + "|" );

// // 将所有的中间的空格替换成一个单个的空格
// str = trim(str).replace(/\s+/g, " ").replace(/,\s+/g, ",");
// alert("|" + str + "|");
var trim = function(str) {
    return str.replace(/^s+|\s+$/g, str);
}
str = trim(str).replace(/\s+/g, " ").replace(/,\s+/g, ",");
alert("|" + str + "|");