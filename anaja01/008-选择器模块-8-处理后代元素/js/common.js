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
    // => [ '.dv  .c1', ' .c2' ]
    each(newSelector, function(i, v) {
        var list = v.split(' ');
        var c = context;
        for (var i = 0; i < list.length; i++) {
            if (list[i] === '') continue;
            c = get(list[i], c);
        }

        results.push.apply(results, c);
    })
    return results;
}