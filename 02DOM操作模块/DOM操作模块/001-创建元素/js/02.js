        // 2, 在页面中创建 3 个 div, 要求 设置其边框与颜色以及大小
        // 1> 直接设置 style 属性
        // 2> 使用 类样式
        // -> setAttribute
        // -> .语法
        onload = function() {
            var node;
            for (var i = 0; i < 3; i++) {
                node = document.createElement('div');
                node.className = 'c';
                //    node.setAttribute('class', c);
                document.body.appendChild(node);
            }
        }


        // 1, 方法比较多, 练习的过程的中每一个做法都要熟练
        // 2, 由于每次循环都使用 document.body.appenChild 因此
        //		会导致每次 for 都要刷新页面结构. 应该采用一个临时的数据
        //		存储这些 dom 对象, 在 全部创建完成以后, 再一并加入


        // 只有创建一个 节点标签, 才可以不影响 整个页面布局, 同时允许存储其他标签
        //			onload = function () {
        //				var i, node, container = document.createElement( 'div' );
        //				for ( i = 0; i < 3; i++ ) {
        //					node = document.createElement( 'div' );
        //					// node.setAttribute( 'class', 'c' );
        //					node.className = 'c';
        //					container.appendChild( node );
        //				}
        //				document.body.appendChild( container );
        //			};

        // 用于缓存文档片段的 DOM 对象 DocumentFragment
        onload = function() {
            var i, node, container = document.createDocumentFragment();
            for (i = 0; i < 3; i++) {
                node = document.createElement('div');
                node.className = 'c';
                // node.setAttribute('class', c);
                container.appendChild(node);
            }
            document.body.appendChild(container);

        };