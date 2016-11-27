var getTag = function(tag, results) {
    results = results || [];
    results.push.apply(results, document.getElementsByTagName(tag));
    return results;
}
var getId = function(id, results) {
    results = results || [];
    results.push(document.getElementById(id));
    return results;
}
var getClass = function(className, results) {
    results = results || [];
    if (document.getElementsByClassName) {
        results.push.apply(results, document.getElementsByClassName(className));
    } else {
        each(getTag('*'), function(i, v) {
            if ((' ' + v.className + ' ').indexOf(' ' + className + ' ') != -1) {
                results.push(v);
            }
        })
    }
}

var each = function(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        if (fn.call(arr[i], i, arr[i]) === false) {
            break;
        }
    }
}

var get = function(selector, results) {
    results = results || [];
    var rquickExpr = /^(?:#([\w-]+)|\.([\w-]+)|([\w]+))|(\*))$/;
    var m = rquickExpr.exec(selector);
    if (m) {
        if (m[1]) {
            results = getId(m[1], results);
        } else if (m[2]) {
            results = getClass(m[2], results);
        } else if (m[3]) {
            results = getTag(m[3], results);
        } else if (m[4]) {
            results = getTag(m[4], results);
        }
    }
    return results;
}