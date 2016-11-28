< !DOCTYPE html >
    <
    html >

    <
    head >
    <
    meta charset = "UTF-8" >
    <
    title > < /title> <
    script src = "./js/04.js" >
    <
    /script> <
    /head>

<
body >
    <
    /body>

<
/html>.innerHTML = html;
// 4, 遍历div的子元素, 加入 docfrag
// 在 DOM 元素中默认有一个特征, 即元素只允许有一个 父节点
// 如果添加元素到另一个节点中, 该元素会自动的离开原来的父节点
while (div.firstChild) {
    docfrag.appendChild(div.firstChild);
}
// 5, 获得其子元素返回
return docfrag;
};