var select = (function() {
    var myPush = function(target, els) {
        var j = target.length,
            i = 0;
        while ((target[j++] = els[i++])) {
            target.length = j - 1;
        }
    }
    var getTag = function(tag, context, results) {
        results = results || [];
        try {
            results.myPush.apply(results, context.getElemetsByTagName(tag));
        } catch (e) {
            myPush(results, context.getElemetsByTagName(tag));
        }
    }
    var getId = function(id, results) {
        results = results || [];
        results.push(document.getElementById(id));
        return results;
    }
    var getClass = function(className, context, results) {
        results = results || [];
        if (document.getElementsByClassName) {
            results.push.apply(results, context.getElementsByClassName(className));
        } else {
            each(getTag('*'), function(i, v) {
                if ((' ' + v.className + ' ').indexOf(' ' + className + ' ') != -1) {
                    results.push(v);
                }
            })
        }
        return results;
    }
    var each = function(arr, fn) {
        for (var i = 0; i < arr.length; i++) {
            if (fn.call(arr[i], i, arr[i]) === false) {
                break;
            }
        }
    }
    var get = function(selector, context, results) {
        results = results || [];
        context = context || document;
        //                     1          2        3       4
        var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))$/,
            m = rquickExpr.exec(selector);
        if (m) {
            if (context.nodeType) {
                context = [context];
            }
            //     		// 在页面中找到所有的 .c3 的节点, 然后在 .c3 的后代元素中
            // // 找符合 .c 的节点, 并返回
            // each( get( '.c', '.c3' ), function () { 
            // 	this.style.backgroundColor = 'pink';
            // } );
            // 如果 context 是一个 dom 数组就没有问题了
            // 但是 context 是一个选择器字符串. 有可能是 '.c'
            // 
            if (typeof context == 'string') {
                context = get(context);
            }
            each(context, function(i, v) {
                if (m[1]) {
                    results = getId(m[1], results);
                } else if (m[2]) {
                    results = getClass(m[2], v, results);
                } else if (m[3]) {
                    results = getTag(m[3], this, results);
                } else if (m[4]) {
                    results = getTag(m[4], this, results);
                }
            });
        }
        return results;
    }
    var myTrim = function(str) {
        if (String.prototype.trim) {
            return str.trim();
        } else {
            return str.replace(/^\s+|\s+$/g, '');
        }
    }
    var select = function(selector, context, results) {
        results = results || [];
        var newSelector = selector.split(',');
        each(newSelector, function(i, v) {
            var list = v.split(',');
            var c = context;
            for (var i = 0; i < list.length; i++) {
                if (list[i] === ' ') continue;
                c = get(list[i], c);
            }
            results.push.apply(results, c);
        })
        return results;
    }
    return select;
})();