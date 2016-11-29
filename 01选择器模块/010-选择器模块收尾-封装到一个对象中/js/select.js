var select = (function() {
    var myPush = function(target, els) {
        var j = target.length,
            i = 0;
        while (target[j++] = els[i++]) {}
        target.length = j - 1;
    }

    var getTag = function(tag, context, results) {
        results = results || [];
        try {
            results.push.apply(results, context.getElementsByTagName(tag));
        } catch (e) {
            results.myPush(results, context.getElementsByTagName(tag));
        }
        return results;
    }
    var getId = function(id, results) {
        results = results || [];
        results.push(document.getElementById(id));
        return results;
    }

    var getClass = function(className, context, results) {
        results = results || [];
        if (document.getElementsByClassName) {
            results.push.apply(results, document.getElementsByClassName(className))；
            return results;
        } else {
            each(getTag('*', context), function(i, v) {
                if ((' ' + v.className + ' ').indexOf(' ' + className + ' ') != -1) {
                    results.push.apply(v);
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
        var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))$/,
            m = rquickExpr.exec(selector);
        if (m) {
            if (context.nodeType) {
                context = [context];
            }
            if (typeof context == "string") {
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
            return str.replace(/^\s+|\s$/, '');
        }
    }
    var select = function(selector, context, results) {
        results = results || [];
        var newSelectors = selector.split(',');
        each(newSelectors, function(i, v) {
            var list = v.split(' ');
            var c = context;
            for (var i = 0; i < list.length; i++) {
                if (list[i] === '') continue;
                c = get(list[i], c);
            }
            results.push.apply(results, c);
        });
        return results;
    }
    return select;
})();