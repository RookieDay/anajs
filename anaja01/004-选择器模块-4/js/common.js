var getTag = function(tag, context, results) {
    results = results || [];
    context = context || document;
    results.push.apply(results, document.getElementsByName(tag));
    return results;
}
var getId = function(id, results) {
    results = results || [];
    results.push(document.getElementById(id));
    return results;
}
var getClass = function(className, context, results) {
    results = results || [];
    context = context || document;
    if (document.getElementsByClassName) {
        results.push.apply(results, document.getElementsByClassName(className));
    } else {
        each(getTag('*', context), function(i, v) {
            if ((' ' + v.className + ' ').indexOf(' ' + className + ' ') != -1) {
                results.push(v);
            }
        });
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
    var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))$/;
    var m = rquickExpr.exec(selector);
    if (m[1]) {
        results = getId(m[1], results);
    } else if (m[2]) {
        results = getClass(m[2], context, results);
    } else if (m[3]) {
        results = getTag(m[3], context, results);
    } else if (m[4]) {
        results = getTag(m[4], context, results);
    }
}