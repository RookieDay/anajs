// jq 中
// $( '<div style=""></div>' );

// itcast -> I
// var dom = I( '<a href="http://www.baidu.com">一个链接</a>' )

var cElem = function(html) {
    // 1, 在内部创建一个 docfrag
    var docfrag = document.createDocumentFragment();
    // 2, 创建真正的 div, 然后设置其 innerHTMl 为出入的字符串
    // 然后在遍历该子元素, 将内容加入到 docfrag 中
    var div = document.createElement('div');
    // 3, 将字符串设置为 它的 innerHTML
    div.innerHTML = html;
    // 4, 遍历div的子元素, 加入 docfrag
    // 在 DOM 元素中默认有一个特征, 即元素只允许有一个 父节点
    // 如果添加元素到另一个节点中, 该元素会自动的离开原来的父节点
    while (div.firstChild) {
        docfrag.appendChild(div.firstChild);
    }
    // 5, 获得其子元素返回
    return docfrag;
};