   // 1, 创建 10 个 div 并在里面写上 'div 序号'
   // 		加到 body 中

   // DOM 方法
   // document.createElement( '元素标签名' )
   // document.createTextNode( '文本' )

   onload = function() {
       var i, node, text;
       for (i = 0; i < 10; i++) {
           node = document.createElement('div');
           txt = document.createTextNode('div' + (i + 1));
           node.appendChild(txt);
           document.body.appendChild(node);
       }
   }


   // 2, 在页面中创建 3 个 div, 要求 设置其边框与颜色以及大小
   // 1> 直接设置 style 属性
   // 2> 使用 类样式
   // -> setAttribute
   // -> .语法