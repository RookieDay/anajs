	// 传统的处理方式, 就是使用函数获得
	//		var get = function ( tag ) {
	//			return document.getElementsByTagName( tag );
	//		};

	// ...
	// 1, 获得所有的元素
	var divs = document.getElementsByTagName('div');
	var ps = document.getElementsByTagName('p');

	// 2, 遍历添加样式
	for (var i = 0; i < divs.length; i++) {
	    divs[i].style.backgroundColor = 'pink';
	}
	for (var i = 0; i < ps.length; i++) {
	    ps[i].style.backgroundColor = 'pink';
	}
	// 为什么?
	// 1> 代码冗余
	// 2> 丑
	// 3> 复用
	// 4> 容错
	// 5> 效率
	// 6> 性能
	// ... ...


	// 函数化