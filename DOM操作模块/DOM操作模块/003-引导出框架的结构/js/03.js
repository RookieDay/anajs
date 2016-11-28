 var ana = function(selector) {
     return new ana.prototype.init(selector);
 };
 //  var ana = function(selector) {
 //      return new ana.prototype.init(selector);
 //  }
 ana.fn = ana.prototype = {
     constructor: ana,
     init: function(selector) {

         // ... if ( typeof ... = string ) ...

     },


     extend: function(obj) {},

     // 功能性方法
     appendTo: function(selector) { /*....*/ }


 };
 //  ana.fn = ana.prototype = {
 //      constructor:ana,
 //      init:function(selector){},
 //      extend:function(obj){}
 //  }
 //  ana.fn.init.prototype = ana.prototype
 // method
 // function
 ana.fn.init.prototype = ana.prototype;

 // var temp = ana( '' );
 // 在 jq 中, 方法的种类很多
 // 选择:  next, nextAll, find, children, ..., filter()
 // dom:	 appendTo, prependTo, after, ...
 // 属性:  attr, val, text, html, ...
 // 样式:  css, addClass, hasClass, toggleClass, ...
 // 事件:  click, on, mousedown, ...
 // 动画:  show, hide, slidDown, animate, ...
 // 队列, ajax, ...
 // 插件 ...

 ana.fn.xxx = xx;
 ana.fn.xxx = xx;
 ana.fn.xxx = xx;
 ana.fn.xxx = xx;
 ana.fn.xxx = xx;

 // 模块
 ana.fn.extend({
     xxx: xxxx,
     xxx: xxxxxx,
     xxx: function() {}
 });

 // 提供功能性成员
 ana.extend({


 });


 // $.each