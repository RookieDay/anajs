	// 将字符串转换成 DOM 对象
	var cELem = function(html) {
	    var docfrag = document.createDocumentFragment();
	    var div = document.getElement('div');
	    div.innerHTML = html;
	    while (div.firstChild) {
	        docfrag.appendChild(div.firstChild);
	    }
	    return {
	        element: docfrag,
	        appendTo: function(dom) {
	            dom.appendChild(this.element);
	        }
	    }
	}



	// cElem( '...' ).appendTo( document.body );
	// 函数返回 DOM 对象, 没有该方法
	// 但是现在需要该方法. 在原型中添加??? 在哪一个原型中添加呢?
	// 首先不确定 dom 对象的共有原型, 同时可能引起原型链搜索性能问题
	// 其次开发的原则是不影响内置对象成员

	// 因此不应该直接在 DOM 对象上添加成员

	// 给 DOM 对象提供一个包装对象
	// 可以考虑将 cELem 函数返回的对象做一个修改, 然后其是一个 自定义对象
	// 该对象中有 appendTo 方法


	onload = function() {

	    cElem('<div style="border: 1px solid red; width: 200px; height: 100px;"></div>')
	        .appendTo(document.body);

	};