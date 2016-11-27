// // Object.create()
// var getClass = function(className, results) {
//     results = results || [];

//     var tempArr, i;

//     // 首先判断系统所提供的方法是否可以实现该功能
//     if (document.getElementsByClassName) {
//         // 系统可以实现
//         results.push.apply(results, document.getElementsByClassName(className));
//     } else {
//         // 自定义实现
//         // 思路: 首先获得所有元素, 然后在元素中搜索符合要求的, 再加入到数组中
//         tempArr = document.getElementsByTagName('*');
//         // for 循环, 判断是否符合要求
//         for (i = 0; i < tempArr.length; i++) {
//             // tempArr[ i ].className === className	// 多个样式
//             // tempArr[ i ].className.indexOf( className ) != -1  // 例如查找 ' c ' 类样式

//             // 兼容: className 或 getAttribute
//             //						if ( ( ' ' + tempArr[ i ].className + ' ' )
//             //									.indexOf( ' ' + className + ' ' ) != -1 ) {
//             //							results.push( tempArr[ i ] );
//             //						}



//             // 使用传统的处理方法
//             // tempArr[ i ] 就是 一个元素, 判断该元素的 className 中是否包含 传入的参数
//             // className

//             // 比如元素 <div class="c1 c2 c3"></div>
//             // "c"
//             // 注意 className 属性需要验证非空
//             var list = tempArr[i].className.split(' ');
//             for (var j = 0; j < list.length; j++) {
//                 if (list[j] === className) {
//                     results.push(tempArr[i]);
//                     break;
//                 }
//             }

//         }
//     }
//     return results;
// };

var getClass = function(className, results) {
    results = results || [];
    var tempArr, i;
    if (document.getElementsByClassName) {
        results.push.apply(results, document.getElementsByClassName(className));
    } else {
        tempArr = document.getElementsByTagName('*');
        for (var i = 0; i < tempArr.length; i++) {
            var list = tempArr[i].className.split(' ');
            for (var j = 0; j < list.length; j++) {
                results.push(tempArr[i]);
                break;
            }
        }
    }
    return results;
}