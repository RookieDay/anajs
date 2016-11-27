	// document.getElementsByClassName = 123;
			
			// 1, 如何判断浏览器不支持该方法
			
			/*
			node
			
			if ( node.getElementsByClassName ) {
				return node.getElementsByClassName( className );
			} else {
				自己实现( className );
			}
			*/
			
			// 在全局作用域中( 最终都要变成沙箱 )提供一个 support 对象
			// 里面提供所有的与方法名相同的属性, 值均为 boolean
			// 在浏览器加载 js 的开始的时候, 就进行能力判断. 将与方法名相同属性作为 真和假进行存储
			// 那么凡是涉及到 能力检查的时候 就直接使用 support 即可
			
			var support = {};
			
			support.getElementsByClassName = !!document.getElementsByClassName;
			
			// 
			if ( support.getElementsByClassName ) {
				// return node.getElementsByClassName( className );
				alert( '支持 class' );
			} else {
				// 自己实现( className );
				alert( '不支持 class' );
			}
			
			// 2, 如果实现该方法
			/*
			var arr = [ 1, 2, 3, 4, 5 ];
			var res = [];
			for ... {
				arr[i] % 2 === 1 {
					res.push( arr[ i ] );
				}
			}
			*/