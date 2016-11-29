// 回顾 jq
// $( 'body' ).append( '<div></div>' );

ana.fn.extend({
    append: function(selector) {
        ana(selector).appendTo(this);
    },
    prepend: function() {},
    prependTo: function(selector) {



    },
    insertAfter: function() {},
    after: function() {}
});
onload = function() {
    I('#loginBtn')[0].onclick = function(e) {
        if (I('#login').length > 0) return;

        // alert( e );
        // 弹出一个登录窗口
        var ilogin = I('<div id="login"></div>');

        I('body').append(ilogin);

        // 设计内部的结构
        ilogin.append('<input type="text" id="uid"/><br />' +
            '<input type="password" id="pwd"/><br />' +
            '<input type="button" value="登 录" id="btn"/><br />' +
            '<input type="button" value="取消" id="cancel"/>'
        );


        I('#cancel')[0].onclick = function() {
            var node = I('#login')[0];
            node.parentNode.removeChild(node);
        };
    };
};