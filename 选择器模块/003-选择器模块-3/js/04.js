var myPush = function(target, els) {
    var j = target.length,
        i = 0;
    // Can't trust NodeList.length
    while (target[j++] = els[i++]) {}
    target.length = j - 1;
}