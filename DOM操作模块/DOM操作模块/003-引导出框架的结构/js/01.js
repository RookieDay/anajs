// 模拟 jq 的使用方法

// 调用规则
// cElem( ... ).appendTo( body );

// 在 jq
// $( html ).appendTo( ... )
// $( 选择器 ).appendTo( ... )
// $( '...' ).appendTo( ... );
// html 字符串, 选择器, DOM 对象, DOM 对象数组, ...

// $( 'p' ).css( 'border', '1px solid red' );
/*
var o = {
	elements: [ p, p, p , ... , p ],
	css: function ( name, value ) {
		this.elements[ i ].style[ name ] = value;
	}
}
*/

// 我们需要的是一个 通用函数 ( 类似 jq 中 $ ). 实际上不是 创建 html 的函数
// 返回自定对象. 而是要 通用函数 返回自定义对象. 如果通用函数参数是一个 html 
// 字符串, 则创建该 dom 对象, 加到通用函数返回的对象中.

// 准备一个 ana 的函数, 将其放在一个 ana.js 文件中, 提供简写 I

var ana = function(selector) {
    var o;
    if (selector 是 选择器) {
        o = select(selector);
    } else if (html 字符串) {
        o = cElem(selector);
    }

    o.appendTo = function() {};
    o.prependTo = function() {};
    o.after = function() {};
    o.before = function() {};
    o.css = function() {};
    o.val = function() {};
    o.text = function() {};
    // 

    return o;
};


// 例如
ana('<div></div>').appendTo(ana('body'));