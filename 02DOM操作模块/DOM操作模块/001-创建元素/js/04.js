// 在页面中添加 1000 个div

var count = 50000;

var test1 = function() {
    var start = +new Date(),
        i, end, node, docfrag;

    docfrag = document.createDocumentFragment();
    for (i = 0; i < count; i++) {
        node = document.createElement('div');
        docfrag.appendChild(node);
    }
    document.body.appendChild(docfrag);

    end = +new Date();

    console.log('test1 = ' + (end - start));
};


var test2 = function() {
    var start = +new Date(),
        i, end, s;

    s = '';
    for (i = 0; i < 1000; i++) {
        s += '<div></div>';
        // document.body.innerHTML += '<div></div>';
    }
    document.body.innerHTML = s;

    end = +new Date();

    console.log('test2 = ' + (end - start));
};


onload = function() {
    // test1();
    test2()
};