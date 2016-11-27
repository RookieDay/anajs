	// // document.getElementsByClassName = 123;


	// var support = {};

	// // support.getElementsByClassName = !!document.getElementsByClassName;
	// // 在 jq 中不仅判断他是否存在, 还要判断其能力是否符合要求

	// support.getElementsByClassName = (function() {

	//     var isExist = !!document.getElementsByClassName;

	//     if (isExist && typeof document.getElementsByClassName == 'function') {
	//         // 自己创建一些元素, 并且加上 class 属性, 看是否可以获得到加上的所有元素
	//         var div = document.createElement('div'),
	//             divWithClass = document.createElement('div');

	//         divWithClass.className = 'c';
	//         div.appendChild(divWithClass);
	//         return div.getElementsByClassName('c')[0] === divWithClass;

	//     }

	//     return false;
	// })();


	// if (support.getElementsByClassName) {
	//     // return node.getElementsByClassName( className );
	//     alert('支持 class');
	// } else {
	//     // 自己实现( className );
	//     alert('不支持 class');
	// }


	var support = {};
	support.getElementsByClassName = (function() {
	    var isExist = !!document.getElementsByClassName;
	    if (isExist && typeof document.getElementsByClassName == 'function') {
	        var div = document.createElement('div');
	        var divWithClass = document.createElement('div');
	        divWithClass.className = "c";
	        div.appendChild(divWithClass);
	        return div.getElementsByClassName('c')[0] === divWithClass;
	    }
	    return false;
	})();

	if (support.getElementsByClassName) {
	    alert('suppoty');
	} else {
	    alert('no support');
	}