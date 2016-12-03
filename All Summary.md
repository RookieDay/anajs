// jQuery的入口函数
// 作用跟 window.onload 是一样的
// jQuery的入口函数 第一种形式
$(document).ready(function () {});
// 第二种形式, 这是上面这种形式的简写，作用完全一样
$(function() {});


jQuery入口函数与js入口函数的区别（理解）
    js入口函数指的是：window.onload = function() {};
    区别一：书写个数不同
        Js入口函数只能出现一次，出现多次会存在事件覆盖的问题。
        jQuery的入口函数，可以出现任意多次，并不会存在事件覆盖问题。
    区别二：执行时机不同
        Js入口函数是在所有的文件资源加载完成后，才执行。这些文件资源包括：页面文档、外部的js文件、外部的css文件、图片等。
        jQuery的入口函数，是在文档加载完成后，就执行。文档加载完成指的是：DOM树加载完成后，就可以操作DOM了，不用等到所有的外部资源都加载完成。
        文档加载的顺序：从上往下，边解析边执行。

jQuery对象和DOM对象的相互转换:
    DOM对象此处指的是：使用js操作DOM返回的结果。
        var btn = document.getElementById(“btnShow”); // btn就是一个DOM对象   
    jQuery对象此处指的是：使用jQuery提供的操作DOM的方法返回的结果。
        jQuery拿到DOM对象后又对其做了封装，让其具有了jQuery方法的jQuery对象，说白了，就是把DOM对象重新包装了一下。
        （联想：手机和有手机壳的手机，手机就好比是DOM对象，有手机壳的手机就好比是jQuery对象）
        var $btn = $(“#btnShow”); // $btn就是一个jQuery对象
    DOM对象转换成jQuery对象：
        var $btn1 = $(btn); // 此时就把DOM对象btn转换成了jQuery对象$btn1
        // $(document）.ready(function(){}); // 调用入口函数
        // 此处是将document这个js的DOM对象，转换成了jQuery对象，然后才能调用jQuery提供的方法：ready
    jQuery对象转换成DOM对象：
        // 第一种方式
        var btn1 = $btn[0]; // 此时就把jQuery对象$btn转换成了DOM对象btn1 （推荐使用此方式）
        // 第二种方式
        var btn2 = $btn.get(0);// 此时就把jQuery对象$btn转换成了DOM对象btn2
以下模拟Jq对象的内部处理：
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script>
        window.onload = function () {
            var divs = document.getElementsByTagName("div");
            var obj = {
                0: divs[0],
                1: divs[1],
                2: divs[2],
                length: divs.length
            };
            for(var i = 0; i < obj.length; i++) {
                obj[i].innerHTML = "我是内容";
            }
        }

    </script>
</head>
<body>
<div></div>
<div></div>
<div></div>
</body>
</html>

几个自己经常分不清的选择器：
    空格 后代选择器  $(“#j_wrap li”).css(“color”, “red”);选择id为j_wrap的元素的所有后代元素li
    >    子代选择器  $(“#j_wrap > ul > li”).css(“color”, “red”);选择id为j_wrap的元素的所有子元素ul的所有子元素li
    举例   
        $(document).ready(function(){
            // 子代选择器
            // 符号：>
            // 作用：选择指定元素下面的直接子元素（亲儿子元素）
            //$("#ulItem > li").css("background", "pink");
            //$("#ulItem > li").css("height", "100px");

            // 后代选择器
            // 符号：空格
            // 作用：选择指定元素下面的所有 指定的元素（后代）
            $("#ulItem li").css("background", "pink");
        });

find(selector)	查找指定元素的所有后代元素（子子孙孙）	$(“#j_wrap”).find(“li”).css(“color”, “red”);选择id为j_wrap的所有后代元素li
children()	查找指定元素的直接子元素（亲儿子元素）	$(“#j_wrap”).children(“ul”).css(“color”, “red”);选择id为j_wrap的所有子代元素ul
siblings()	查找所有兄弟元素（不包括自己）	$(“#j_liItem”).siblings().css(“color”, “red”);选择id为j_liItem的所有兄弟元素
parent()	查找父元素（亲的）	$(“#j_liItem”).parent(“ul”).css(“color”, “red”);选择id为j_liItem的父元素
eq(index)	查找指定元素的第index个元素，index是索引号，从0开始	$(“li”).eq(2).css(“color”, “red”);选择所有li元素中的第二个

JQ02:
toggleClass(className) 为指定元素切换类 className，该元素有类则移除，没有指定类则添加。$(selector).toggleClass(“liItem”);
显示和隐藏
    1 show方法
    作用：让匹配的元素展示出来
    // 用法一：
    // 不带参数，作用等同于 css(“display”, ”block”)
    /* 注意：此时没有动画效果 */
    $(selector).show();

    // 用法二：
    // 参数为数值类型，表示：执行动画时长
    /* 单位为：毫秒（ms），参数2000表示动画执行时长为2000毫秒，即2秒钟 */
    $(selector).show(2000);
    
    // 参数为字符串类型，是jQuery预设的值，共有三个，分别是：slow、normal、fast
    /* 跟用法一的对应关系为： */
    /* slow：600ms、normal：400ms、fast：200ms */
    $(selector).show(“slow”);

    // 用法三：
    // 参数一可以是数值类型或者字符串类型
    // 参数二表示：动画执行完后立即执行的回调函数 切记这种设计思想  在执行完动画后的回调函数
    $(selector).show(2000, function() {});

    注意：
    jQuery预设的三组动画效果的语法几乎一致：参数可以有两个，第一个是动画的执行时长，第二个是动画执行完成后的回调函数。
    第一个参数是：可以是指定字符或者毫秒数

    2 hide方法
    作用：让匹配元素隐藏掉
    用法参考show方法
    $(selector).hide(1000); // 1000表示什么？
    $(selector).hide(“slow”);
    $(selector).hide(1000, function(){});
    $(selector).hide();

一、滑入滑出动画
    1滑入动画效果（联想：生活中的卷帘门）
    作用：让元素以下拉动画效果展示出来
    $(selector).slideDown(speed,callback);

    注意：省略参数或者传入不合法的字符串，那么则使用默认值：400毫秒（同样适用于fadeIn/slideDown/slideUp）
    $(selector).slideDown();

    2 滑出动画效果
    作用：让元素以上拉动画效果隐藏起来
    $(selector).slideUp(speed,callback);

    3滑入滑出切换动画效果
    $(selector).slideToggle(speed,callback);
    参数等同与隐藏和显示

二、淡入淡出动画
    1 淡入动画效果
    作用：让元素以淡淡的进入视线的方式展示出来
    $(selector).fadeIn(speed, callback);
    2 淡出动画效果
    作用：让元素以渐渐消失的方式隐藏起来
    $(selector).fadeOut(1000);
    3淡入淡出切换动画效果
    作用：通过改变不透明度，切换匹配元素的显示或隐藏状态
    $(selector).fadeToggle('fast',function(){});
    参数等同与隐藏和显示

    4改变不透明度到某个值
    与淡入淡出的区别：淡入淡出只能控制元素的不透明度从 完全不透明 到完全透明；而fadeTo可以指定元素不透明度的具体值。并且时间参数是必需的！
    作用：调节匹配元素的不透明度 
    // 用法有别于其他动画效果
    // 第一个参数表示：时长
    // 第二个参数表示：不透明度值，取值范围：0-1
    $(selector).fadeTo(1000, .5); //  0全透，1全不透
    // 第一个参数为0，此时作用相当于：.css(“opacity”, .5);
    $(selector).fadeTo(0, .5);


停止动画
    //作用：停止当前正在执行的动画
    $(selector).stop();
    为什么要停止动画？
    如果一个以上的动画方法在同一个元素上调用，那么对这个元素来说，后面的动画将被放到效果队列中。这样就形成了动画队列。（联想：排队进站）
    动画队列里面的后续动画不会执行，直到第一个动画执行完成。
    注意：如果一个元素的动画还没有执行完，此时调用sotp()方法，那么动画将会停止，回调函数也不会被执行。
    有规律的体现：
    jQuery提供的这几个动画效果控制的CSS属性包括：高度、宽度、不透明度。{height:400px; width:300px; opacity:0.4;}
    这三个CSS属性的共性是：属性值只有一个，并且这个值是数值（去掉单位后）。

自定义动画
    注意：所有能够执行动画的属性必须只有一个数字类型的值。
    比如：要改变字体大小，要使用：fontSize（font-size），不要使用：font

    动画支持的属性：
        http://www.w3school.com.cn/jquery/effect_animate.asp

    作用：执行一组CSS属性的自定义动画
    // 第一个参数表示：要执行动画的CSS属性（必选）
    // 第二个参数表示：执行动画时长（可选）
    // 第三个参数表示：动画执行完后立即执行的回调函数（可选）
    $(selector).animate({params},speed,callback);


jQuery节点操作
动态创建元素
    // $()函数的另外一个作用：动态创建元素
    var $spanNode = $(“<span>我是一个span元素</span>”);
	
添加元素
在元素的最后一个子元素后面追加元素：append()（重点）
作用：在被选元素内部的最后一个子元素（或内容）后面插入内容（存在或者创建出来的元素都可以）
如果是页面中存在的元素，那么调用append()后，会把这个元素从原先的位置移除，然后再插入到新的位置。
	 如果是给多个目标追加一个元素，那么append()方法的内部会复制多份这个元素，然后追加到多个目标里面去。
常用参数：htmlString 或者 jQuery对象

// 在$(selector)中追加$node
$(selector).append($node);
// 在$(selector)中追加div元素，参数为htmlString
$(selector).append('<div></div>');


不常用操作：（用法跟append()方法基本一致）
    1 appendTo()
    作用：同append()，区别是：把$(selector)追加到node中去
    $(selector).appendTo(node);

    2 prepend()
    作用：在元素的第一个子元素前面追加内容或节点
    $(selector).prepend(node);

    3 after()
    作用：在被选元素之后，作为兄弟元素插入内容或节点
    $(selector).after(node);

    4 before()
    作用：在被选元素之前，作为兄弟元素插入内容或节点
    $(selector).before(node);

html创建元素（推荐使用，重点）
    作用：设置或返回所选元素的html内容（包括 HTML 标记）
    设置内容的时候，如果是html标记，会动态创建元素，此时作用跟js里面的 innerHTML属性相同
    // 动态创建元素
    $(selector).html(‘<span>传智播客</span>’);
    // 获取html内容
    $(selector).html();
    // 传入一个空字符串，表示清空内容
    $(selector).html(“”);

清空元素
    // 清空指定元素的所有子元素（光杆司令）
    // 没有参数
    $(selector).empty();
    // “自杀” 把自己（包括所有内部元素）从文档中删除掉
    $(selector).remove();

复制元素
    作用：复制匹配的元素
    // 复制$(selector)所匹配到的元素
    // 返回值为复制的新元素
    $(selector).clone();

总结：
	推荐使用.html(“<span></span>”)方法来创建元素或者html("")清空元素

操作属性、值和内容
属性操作
    设置属性：
    // 第一个参数表示：要设置的属性名称
    // 第二个参数表示：改属性名称对应的值
    $(selector).attr(“title”, “传智播客”);
获取属性：
    // 参数为：要获取的属性的名称，改操作会返回指定属性对应的值
    $(selector).attr(“title”);

移除属性：
    // 参数为：要移除的属性的名称
    $(selector).removeAttr(“title”); 
注意：checked、selected、disabled要使用.prop()方法。
prop方法通常用来控制DOM元素的动态状态，而不是改变的HTML属性。例如：input和button的disabled特性，以及checkbox的checked特性。
细节参考：http://api.jquery.com/prop/

值和内容
val()方法：
    作用：设置或返回表单元素的值，例如：input,select,textarea的值
    // 获取匹配元素的值，只匹配第一个元素
    $(selector).val();
    // 设置所有匹配到的元素的值
    $(selector).val(“具体值”);

text() 方法:
    作用：设置或获取匹配元素的文本内容
    //获取操作不带参数（注意：这时候会把所有匹配到的元素内容拼接为一个字符串，不同于其他获取操作！）
    $(selector).text();
    //设置操作带参数，参数表示要设置的文本内容
    $(selector).text(“我是内容”);
    
sublime 设置打开浏览器：
选择preferences --- key binding --user 复制下面内容到json数组里面
    //ie
     { 
     	"keys": ["f12"], 
     	"command": "side_bar_files_open_with", 
     	"args": 
     	{ 
     		"paths": [], 
     		"application": "C:/Program Files/Internet Explorer/iexplore.exe",
     		 "extensions": ".*" 
     	} 
     }, 
    //chorme 
    { 
    	"keys": ["alt+f12"], 
    	"command": "side_bar_files_open_with", 
    	"args": 
    	{ 
    		"paths": [], 
    		"application": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", 
    		"extensions": ".*" 
    	} 
    } 


JQ 事件绑定：
    历程：简单事件绑定 >> bind事件绑定 >> delegate事件绑定 >> on
   
    	简单事件绑定：
    click(handler) 				单击事件
    blur(handler) 				失去焦点事件
    mouseenter(handler) 		鼠标进入事件
    mouseleave(handler)			鼠标离开事件
    dbclick(handler) 			双击事件
    change(handler) 改变事件，如：文本框值改变，下来列表值改变等
    focus(handler) 				获得焦点事件
    keydown(handler) 			键盘按下事件
    其他参考：http://www.w3school.com.cn/jquery/jquery_ref_events.asp
   
    	bind方式（不推荐，1.7以后的jQuery版本被on取代）
    作用：给匹配到的元素直接绑定事件
    // 绑定单击事件处理程序
    第一个参数：事件类型
    第二个参数：事件处理程序
    $("p").bind("click mouseenter", function(e){
        //事件响应方法
    });
    比简单事件绑定方式的优势：
        可以同时绑定多个事件，比如：bind(“mouseenter  mouseleave”, function(){})
    缺点：要绑定事件的元素必须存在文档中。

    delegate方式（特点：性能高，支持动态创建的元素）
    作用：给匹配到的元素绑定事件，对支持动态创建的元素有效
    // 第一个参数：selector，要绑定事件的元素
    // 第二个参数：事件类型
    // 第三个参数：事件处理函数
    $(".parentBox").delegate("p", "click", function(){
        //为 .parentBox下面的所有的p标签绑定事件
    });
    与前两种方式最大的优势：减少事件绑定次数提高效率，支持动态创建出来的元素绑定事件！

    on方式（最现代的方式，兼容zepto(移动端类似jQuery的一个库))
    jQuery1.7版本后，jQuery用on统一了所有的事件处理的方法
    作用：给匹配的元素绑定事件，包括了上面所有绑定事件方式的优点
    语法：
    // 第一个参数：events，绑定事件的名称可以是由空格分隔的多个事件（标准事件或者自定义事件）
    // 第二个参数：selector, 执行事件的后代元素
    // 第三个参数：data，传递给处理函数的数据，事件触发的时候通过event.data来使用
    // 第四个参数：handler，事件处理函数
    $(selector).on(events[,selector][,data],handler);

        // 表示给$(selector)绑定事件，当必须是它的内部元素span才能执行这个事件
    $(selector).on( "click","span", function() {});

    // 绑定多个事件
    // 表示给$(selector)匹配的元素绑定单击和鼠标进入事件
    $(selector).on(“click mouseenter”, function(){});

JQ事件解绑
    	unbind() 方式
        作用：解绑 bind方式绑定的事件
        $(selector).unbind(); //解绑所有的事件
        $(selector).unbind(“click”); //解绑指定的事件
    	undelegate() 方式
        作用：解绑delegate方式绑定的事件
        $( selector ).undelegate(); //解绑所有的delegate事件
        $( selector).undelegate( “click” ); //解绑所有的click事件

    off解绑on方式绑定的事件（重点）
        // 解绑匹配元素的所有事件
        $(selector).off();
        // 解绑匹配元素的所有click事件
        $(selector).off(“click”);
        // 解绑所有代理的click事件，元素本身的事件不会被解绑 
        $(selector).off( “click”, "**" ); 

JQ事件触发
    简单事件触发
    $(selector).click(); //触发 click事件
    trigger方法触发事件
    $(selector).trigger(“click”);
    triggerHandler触发 事件处理函数，不触发浏览器行为
    比如:文本框获得焦点的默认行为
    $(selector).triggerHandler(“focus”);

jQuery事件对象
    event.data 					传递给事件处理程序的额外数据
    event.currentTarget 		等同于this，当前DOM对象
    event.pageX 				鼠标相对于文档左部边缘的位置
    event.target 				触发事件源，不一定===this
    event.stopPropagation()；   阻止事件冒泡
    event.preventDefault(); 	阻止默认行为
    event.type 					事件类型：click，dbclick…
    event.which 				鼠标的按键类型：左1 中2 右3
    event.keyCode				键盘按键代码

JQ链式编程： 原理---return this;
    隐式迭代:在方法的内部会为匹配到的所有元素进行循环遍历，执行相应的方法；而不用我们再进行循环，简化我们的操作，方便我们调用。
    如果获取的是多元素的值，大部分情况下返回的是第一个元素的值。$(“li”).css(“font-size”); // 获取的是第一个li的样式

    each方法
    有了隐式迭代，为什么还要使用each函数遍历？
    大部分情况下是不需要使用each方法的，因为jQuery的隐式迭代特性。
    如果要对每个元素做不同的处理，这时候就用到了each方法

    作用：遍历jQuery对象集合，为每个匹配的元素执行一个函数
    // 参数一表示当前元素在所有匹配元素中的索引号
    // 参数二表示当前元素（DOM对象）
    $(selector).each(function(index,element){});


多库共存
    此处多库共存指的是：jQuery占用了$ 和jQuery这两个变量。当在同一个页面中引用了jQuery这个js库，并且引用的其他库（或者其他版本的jQuery库）中也用到了$或者jQuery这两个变量，那么，要保证每个库都能正常使用，这时候就有了多库共存的问题。

    // 模拟另外的库使用了 $ 这个变量
    // 此时，就与jQuery库产生了冲突
    var $ = { name : “itecast” };

    解决方式：
    // 作用：让jQuery释放对$的控制权，让其他库能够使用$符号，达到多库共存的目的。此后，只能使用jQuery来调用jQuery提供的方法
        $.noConflict();
    举例：
        <script>
            /*var $ = 123;

            console.log($);
            // noConflict 释放对$符号的控制权
            $.noConflict();
            jQuery(function () {
                jQuery("li").css("color", "red");
            });*/
            // 如果 $和jQuery这两个都被占用了，那么还可以用 noConflict
            var J = $.noConflict();
            console.log(J);
            var $ = 123;
            var jQuery = 456;
        </script>   

jQuery插件机制
    jQuery这个js库，虽然功能强大，但也不是面面俱到包含所有的功能。
    jQuery是通过插件的方式，来扩展它的功能：
    当你需要某个插件的时候，你可以“安装”到jQuery上面，然后，使用。
    当你不再需要这个插件，那你就可以从jQuery上“卸载”它。
    （联想：手机软件，安装的app就好比插件，用的时候安装上，不用的时候卸载掉）
    

    第三方插件
        jQuery.color.js
        animate()自定义动画：不支持背景的动画效果
        animate动画支持的属性列表
        jQuery.lazyload.js
            使用步骤：
                1.	引入jQuery文件
                2.	引入插件
                3.	使用插件
    制作插件
        如何创建jQuery插件：
        http://learn.jquery.com/plugins/basic-plugin-creation/

        给全局jQuery函数扩展方法
        $.pluginName = function() {};
        // 调用
        $.pluginName();

        给jQuery对象扩展方法
        $.fn.pluginName = function() {};
        $(“div”).pluginName();


jQueryUI
    jQueryUI专指由jQuery官方维护的UI方向的插件。
    官方API：http://api.jqueryui.com/category/all/
    其他教程：jQueryUI教程
    基本使用:
        1.	引入jQueryUI的样式文件
        2.	引入jQuery
        3.	引入jQueryUI的js文件
        4.	使用jQueryUI功能
            
  // 函数声明
  function aa() {}
  // 函数表达式
  var func = function funcName (num1) {
    console.log(funcName);
  };

切记：
window.onload = function(){
    var lis = document.getElementByTagName("li");
    for(var i = 0 ; i < lis.length;i++) {
        lis[i].onclick = (function(){
            return function(){
            alert(num);
            }
        })(i);
    }    
}

1.图标引入
    网站名/favicon.ico     都可以下载到所有网站的图标
    引入图标 比如www.jd.com/favicon.ico
    1.	<link rel="shortcut icon" href="favicon.ico">
    2.	bitbug.net这个网站中有这句话
        a)	<link rel="shortcut icon" href=" /favicon.ico" /> 绿色部分要删掉
2.小标签（s,del,em,I,u,ins…）我们做一些小的效果图，会很青睐他们
    Font: 400 12px/12px “宋体”;     加粗，大小，行高，格式；（不行高，默认为0）。
    s   del   :    删除线
    em  I     :     倾斜
    uins      :     下划线
    outline-style: none;       清除外边线（蓝色）
    text-decoration: none;    清除下划线，删除线。
    Resize : none;    文本框禁止拖拽。
    Font-weight: normal;      加粗变正常
    Font-style: normal;       倾斜变正常。
3.
  内外边距问题
    Padding:  可以加背景色。
    Margin： 不可以加背景色的。
    Border:   不可以加背景色的。（你可以单独给他加边线的颜色）
  行高和高度
    行高：文字的高度。（给父盒子行高，子盒子不会有高度）
    高度：盒子的高度。（给父盒子加高度，子盒子不继承。宽例外）
  盒子稳定性
    宽高：最稳定的。
    Padding：比较稳定。（里面不能放内容，背景图除外）
    Margin：最不稳定。（1.不能放内容。2不能加背景。3.容易出现外边距合								并）     优点：用起来比较方便。
  居中问题
    盒子左右居中      Margin： 0 auto;
    盒子上下居中      （父盒子给padding,  子盒子给margin。 定位）    

    文字左右居中：   1.text-align:center;     2.paddign:  0   10px;
    文字上下居中：   1.line-height:  盒子的高度。   2.。。。
  模拟鼠标
    Cursor :    pointer;             鼠标变成小手
    Cursor :    text;                鼠标变成插入条光标
    Cursor :    move;              鼠标变成四角箭头
    Cursor :    default;             鼠标变成白色箭头
  小知识
    背景图不会撑开盒子。
    图片和文字会撑开盒子。（文字比较特殊）
    在小标签（行内标签）的情况下：定位之后，不写left属性，默认的地方会出现的padding和a链接中的文字之后。
  圆角矩形
    border-radius:   1em;
    border-radius:   50%;
    border-radius:   宽高一半（px）;
    border-radius:   左上角  右上角  右下角  左下角;

  清除浮动：
    原因：父盒子高度为0，子盒子不占位置。
    清除浮动目的：让父盒子有高度。
    解决办法：
        a. clear: both ; 看图一
        b. overflow: hidden ( 缺点：超出盒子的部分会被隐藏) 看图二 
        c. 单伪元素标签法
            .clearfix:after {
                content: “”;
                height: 0;
                visibility: hidden;
                overflow: hidden;
                display: block
                clear: both;
            }
            .clearfix {
                *zoom: 1; /*兼容IE678*/
            }

        d.双伪元素标签法
            .clearfix:after ,.clearfix:before {
                content: “”;
                display: table;
            }
            .clearfix:after {
                clear: both;
            }
            .clearfix {
                *zoom: 1; /*兼用IE678*/
            }

  盒子居中
    左右居中：1.给盒子absolute定位，left=50%；
             2.让盒子移动。 Margin-left: -自身宽度一半。
    上下居中：1.给盒子absolute定位，top=50%；
             2.让盒子移动。 Margin-top: -自身高度一半。
    操作：定位—>absolute。
        左右居中： left：50%；      margin-left: 负盒子自身宽一半
        上下居中： top： 50%；     margin-top：负盒子自身高一半。

  左右移动盒子
    Margin正值的情况下。指的是给盒子外边距。
    Margin负值的情况下。反方向移动盒子。（margin-left ： margin-top）
  继承问题
    宽度会被继承
    行高会被继承
    高度不会被继承
    文字居中（text-align:center）可以被继承
  浮动问题
    不管两个盒子之间的关系是什么。只要不是父子关系。
    他们相互都会受到浮动的影响。
    解决方法：让子盒子，浮动的子盒子，不要超出父盒子。
  Li和a的关系
    如果鼠标放到空白处a链接变色，说明a链接撑开的li 。
    如果鼠标放到空白处a链接不变色，说明li包含的a链接 。
  属性冲突问题
    定位中的left和right不冲突。以left为准。
    定位中的top和bottom不冲突。以top为准
  半透明
    opacity: 0.5；   他可以让盒子半透明。（缺点：就是内容跟着一起半透明）
    background：rgba(255,255,255,0.5);   C3透明度用法。
    background：rgba(255,255,255, .5);    C3透明度用法。
  界面跳转
    a 链接如果不想跳转，方法如下
      javascript:;            <a href=”javascript:;”></a>
      javascript:void(0);     <a href=”javascript:void(0);”></a>
  宽度继承
    是在加上padding值之后，和宽度的总和，等于父盒子的宽度。
  层级
    层级和占不占位置没有关系。（relative本身就是站位置的）
    层级可以继承（拼爹）。（浮动和定位都是不能继承的）
    定位的盒子是最高的。（相比的是标准流和浮动的盒子。）
    只有定位的盒子才有层级。
    如果都有定位，后续的盒子会压住前面的盒子。

// jQuery的入口函数
// 作用跟 window.onload 是一样的
// jQuery的入口函数 第一种形式
$(document).ready(function () {});
// 第二种形式, 这是上面这种形式的简写，作用完全一样
$(function() {});


jQuery入口函数与js入口函数的区别（理解）
    js入口函数指的是：window.onload = function() {};
    区别一：书写个数不同
        Js入口函数只能出现一次，出现多次会存在事件覆盖的问题。
        jQuery的入口函数，可以出现任意多次，并不会存在事件覆盖问题。
    区别二：执行时机不同
        Js入口函数是在所有的文件资源加载完成后，才执行。这些文件资源包括：页面文档、外部的js文件、外部的css文件、图片等。
        jQuery的入口函数，是在文档加载完成后，就执行。文档加载完成指的是：DOM树加载完成后，就可以操作DOM了，不用等到所有的外部资源都加载完成。
        文档加载的顺序：从上往下，边解析边执行。

jQuery对象和DOM对象的相互转换:
    DOM对象此处指的是：使用js操作DOM返回的结果。
        var btn = document.getElementById(“btnShow”); // btn就是一个DOM对象   
    jQuery对象此处指的是：使用jQuery提供的操作DOM的方法返回的结果。
        jQuery拿到DOM对象后又对其做了封装，让其具有了jQuery方法的jQuery对象，说白了，就是把DOM对象重新包装了一下。
        （联想：手机和有手机壳的手机，手机就好比是DOM对象，有手机壳的手机就好比是jQuery对象）
        var $btn = $(“#btnShow”); // $btn就是一个jQuery对象
    DOM对象转换成jQuery对象：
        var $btn1 = $(btn); // 此时就把DOM对象btn转换成了jQuery对象$btn1
        // $(document）.ready(function(){}); // 调用入口函数
        // 此处是将document这个js的DOM对象，转换成了jQuery对象，然后才能调用jQuery提供的方法：ready
    jQuery对象转换成DOM对象：
        // 第一种方式
        var btn1 = $btn[0]; // 此时就把jQuery对象$btn转换成了DOM对象btn1 （推荐使用此方式）
        // 第二种方式
        var btn2 = $btn.get(0);// 此时就把jQuery对象$btn转换成了DOM对象btn2
以下模拟Jq对象的内部处理：
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script>
        window.onload = function () {
            var divs = document.getElementsByTagName("div");
            var obj = {
                0: divs[0],
                1: divs[1],
                2: divs[2],
                length: divs.length
            };
            for(var i = 0; i < obj.length; i++) {
                obj[i].innerHTML = "我是内容";
            }
        }

    </script>
</head>
<body>
<div></div>
<div></div>
<div></div>
</body>
</html>

几个自己经常分不清的选择器：
    空格 后代选择器  $(“#j_wrap li”).css(“color”, “red”);选择id为j_wrap的元素的所有后代元素li
    >    子代选择器  $(“#j_wrap > ul > li”).css(“color”, “red”);选择id为j_wrap的元素的所有子元素ul的所有子元素li
    举例   
        $(document).ready(function(){
            // 子代选择器
            // 符号：>
            // 作用：选择指定元素下面的直接子元素（亲儿子元素）
            //$("#ulItem > li").css("background", "pink");
            //$("#ulItem > li").css("height", "100px");

            // 后代选择器
            // 符号：空格
            // 作用：选择指定元素下面的所有 指定的元素（后代）
            $("#ulItem li").css("background", "pink");
        });

find(selector)	查找指定元素的所有后代元素（子子孙孙）	$(“#j_wrap”).find(“li”).css(“color”, “red”);选择id为j_wrap的所有后代元素li
children()	查找指定元素的直接子元素（亲儿子元素）	$(“#j_wrap”).children(“ul”).css(“color”, “red”);选择id为j_wrap的所有子代元素ul
siblings()	查找所有兄弟元素（不包括自己）	$(“#j_liItem”).siblings().css(“color”, “red”);选择id为j_liItem的所有兄弟元素
parent()	查找父元素（亲的）	$(“#j_liItem”).parent(“ul”).css(“color”, “red”);选择id为j_liItem的父元素
eq(index)	查找指定元素的第index个元素，index是索引号，从0开始	$(“li”).eq(2).css(“color”, “red”);选择所有li元素中的第二个

JQ02:
toggleClass(className) 为指定元素切换类 className，该元素有类则移除，没有指定类则添加。$(selector).toggleClass(“liItem”);
显示和隐藏
    1 show方法
    作用：让匹配的元素展示出来
    // 用法一：
    // 不带参数，作用等同于 css(“display”, ”block”)
    /* 注意：此时没有动画效果 */
    $(selector).show();

    // 用法二：
    // 参数为数值类型，表示：执行动画时长
    /* 单位为：毫秒（ms），参数2000表示动画执行时长为2000毫秒，即2秒钟 */
    $(selector).show(2000);
    
    // 参数为字符串类型，是jQuery预设的值，共有三个，分别是：slow、normal、fast
    /* 跟用法一的对应关系为： */
    /* slow：600ms、normal：400ms、fast：200ms */
    $(selector).show(“slow”);

    // 用法三：
    // 参数一可以是数值类型或者字符串类型
    // 参数二表示：动画执行完后立即执行的回调函数 切记这种设计思想  在执行完动画后的回调函数
    $(selector).show(2000, function() {});

    注意：
    jQuery预设的三组动画效果的语法几乎一致：参数可以有两个，第一个是动画的执行时长，第二个是动画执行完成后的回调函数。
    第一个参数是：可以是指定字符或者毫秒数

    2 hide方法
    作用：让匹配元素隐藏掉
    用法参考show方法
    $(selector).hide(1000); // 1000表示什么？
    $(selector).hide(“slow”);
    $(selector).hide(1000, function(){});
    $(selector).hide();

一、滑入滑出动画
    1滑入动画效果（联想：生活中的卷帘门）
    作用：让元素以下拉动画效果展示出来
    $(selector).slideDown(speed,callback);

    注意：省略参数或者传入不合法的字符串，那么则使用默认值：400毫秒（同样适用于fadeIn/slideDown/slideUp）
    $(selector).slideDown();

    2 滑出动画效果
    作用：让元素以上拉动画效果隐藏起来
    $(selector).slideUp(speed,callback);

    3滑入滑出切换动画效果
    $(selector).slideToggle(speed,callback);
    参数等同与隐藏和显示

二、淡入淡出动画
    1 淡入动画效果
    作用：让元素以淡淡的进入视线的方式展示出来
    $(selector).fadeIn(speed, callback);
    2 淡出动画效果
    作用：让元素以渐渐消失的方式隐藏起来
    $(selector).fadeOut(1000);
    3淡入淡出切换动画效果
    作用：通过改变不透明度，切换匹配元素的显示或隐藏状态
    $(selector).fadeToggle('fast',function(){});
    参数等同与隐藏和显示

    4改变不透明度到某个值
    与淡入淡出的区别：淡入淡出只能控制元素的不透明度从 完全不透明 到完全透明；而fadeTo可以指定元素不透明度的具体值。并且时间参数是必需的！
    作用：调节匹配元素的不透明度 
    // 用法有别于其他动画效果
    // 第一个参数表示：时长
    // 第二个参数表示：不透明度值，取值范围：0-1
    $(selector).fadeTo(1000, .5); //  0全透，1全不透
    // 第一个参数为0，此时作用相当于：.css(“opacity”, .5);
    $(selector).fadeTo(0, .5);


停止动画
    //作用：停止当前正在执行的动画
    $(selector).stop();
    为什么要停止动画？
    如果一个以上的动画方法在同一个元素上调用，那么对这个元素来说，后面的动画将被放到效果队列中。这样就形成了动画队列。（联想：排队进站）
    动画队列里面的后续动画不会执行，直到第一个动画执行完成。
    注意：如果一个元素的动画还没有执行完，此时调用sotp()方法，那么动画将会停止，回调函数也不会被执行。
    有规律的体现：
    jQuery提供的这几个动画效果控制的CSS属性包括：高度、宽度、不透明度。{height:400px; width:300px; opacity:0.4;}
    这三个CSS属性的共性是：属性值只有一个，并且这个值是数值（去掉单位后）。

自定义动画
    注意：所有能够执行动画的属性必须只有一个数字类型的值。
    比如：要改变字体大小，要使用：fontSize（font-size），不要使用：font

    动画支持的属性：
        http://www.w3school.com.cn/jquery/effect_animate.asp

    作用：执行一组CSS属性的自定义动画
    // 第一个参数表示：要执行动画的CSS属性（必选）
    // 第二个参数表示：执行动画时长（可选）
    // 第三个参数表示：动画执行完后立即执行的回调函数（可选）
    $(selector).animate({params},speed,callback);


jQuery节点操作
动态创建元素
    // $()函数的另外一个作用：动态创建元素
    var $spanNode = $(“<span>我是一个span元素</span>”);
	
添加元素
在元素的最后一个子元素后面追加元素：append()（重点）
作用：在被选元素内部的最后一个子元素（或内容）后面插入内容（存在或者创建出来的元素都可以）
如果是页面中存在的元素，那么调用append()后，会把这个元素从原先的位置移除，然后再插入到新的位置。
	 如果是给多个目标追加一个元素，那么append()方法的内部会复制多份这个元素，然后追加到多个目标里面去。
常用参数：htmlString 或者 jQuery对象

// 在$(selector)中追加$node
$(selector).append($node);
// 在$(selector)中追加div元素，参数为htmlString
$(selector).append('<div></div>');


不常用操作：（用法跟append()方法基本一致）
    1 appendTo()
    作用：同append()，区别是：把$(selector)追加到node中去
    $(selector).appendTo(node);

    2 prepend()
    作用：在元素的第一个子元素前面追加内容或节点
    $(selector).prepend(node);

    3 after()
    作用：在被选元素之后，作为兄弟元素插入内容或节点
    $(selector).after(node);

    4 before()
    作用：在被选元素之前，作为兄弟元素插入内容或节点
    $(selector).before(node);

html创建元素（推荐使用，重点）
    作用：设置或返回所选元素的html内容（包括 HTML 标记）
    设置内容的时候，如果是html标记，会动态创建元素，此时作用跟js里面的 innerHTML属性相同
    // 动态创建元素
    $(selector).html(‘<span>传智播客</span>’);
    // 获取html内容
    $(selector).html();
    // 传入一个空字符串，表示清空内容
    $(selector).html(“”);

清空元素
    // 清空指定元素的所有子元素（光杆司令）
    // 没有参数
    $(selector).empty();
    // “自杀” 把自己（包括所有内部元素）从文档中删除掉
    $(selector).remove();

复制元素
    作用：复制匹配的元素
    // 复制$(selector)所匹配到的元素
    // 返回值为复制的新元素
    $(selector).clone();

总结：
	推荐使用.html(“<span></span>”)方法来创建元素或者html("")清空元素

操作属性、值和内容
属性操作
    设置属性：
    // 第一个参数表示：要设置的属性名称
    // 第二个参数表示：改属性名称对应的值
    $(selector).attr(“title”, “传智播客”);
获取属性：
    // 参数为：要获取的属性的名称，改操作会返回指定属性对应的值
    $(selector).attr(“title”);

移除属性：
    // 参数为：要移除的属性的名称
    $(selector).removeAttr(“title”); 
注意：checked、selected、disabled要使用.prop()方法。
prop方法通常用来控制DOM元素的动态状态，而不是改变的HTML属性。例如：input和button的disabled特性，以及checkbox的checked特性。
细节参考：http://api.jquery.com/prop/

值和内容
val()方法：
    作用：设置或返回表单元素的值，例如：input,select,textarea的值
    // 获取匹配元素的值，只匹配第一个元素
    $(selector).val();
    // 设置所有匹配到的元素的值
    $(selector).val(“具体值”);

text() 方法:
    作用：设置或获取匹配元素的文本内容
    //获取操作不带参数（注意：这时候会把所有匹配到的元素内容拼接为一个字符串，不同于其他获取操作！）
    $(selector).text();
    //设置操作带参数，参数表示要设置的文本内容
    $(selector).text(“我是内容”);
    
sublime 设置打开浏览器：
选择preferences --- key binding --user 复制下面内容到json数组里面
    //ie
     { 
     	"keys": ["f12"], 
     	"command": "side_bar_files_open_with", 
     	"args": 
     	{ 
     		"paths": [], 
     		"application": "C:/Program Files/Internet Explorer/iexplore.exe",
     		 "extensions": ".*" 
     	} 
     }, 
    //chorme 
    { 
    	"keys": ["alt+f12"], 
    	"command": "side_bar_files_open_with", 
    	"args": 
    	{ 
    		"paths": [], 
    		"application": "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", 
    		"extensions": ".*" 
    	} 
    } 


JQ 事件绑定：
    历程：简单事件绑定 >> bind事件绑定 >> delegate事件绑定 >> on
   
    	简单事件绑定：
    click(handler) 				单击事件
    blur(handler) 				失去焦点事件
    mouseenter(handler) 		鼠标进入事件
    mouseleave(handler)			鼠标离开事件
    dbclick(handler) 			双击事件
    change(handler) 改变事件，如：文本框值改变，下来列表值改变等
    focus(handler) 				获得焦点事件
    keydown(handler) 			键盘按下事件
    其他参考：http://www.w3school.com.cn/jquery/jquery_ref_events.asp
   
    	bind方式（不推荐，1.7以后的jQuery版本被on取代）
    作用：给匹配到的元素直接绑定事件
    // 绑定单击事件处理程序
    第一个参数：事件类型
    第二个参数：事件处理程序
    $("p").bind("click mouseenter", function(e){
        //事件响应方法
    });
    比简单事件绑定方式的优势：
        可以同时绑定多个事件，比如：bind(“mouseenter  mouseleave”, function(){})
    缺点：要绑定事件的元素必须存在文档中。

    delegate方式（特点：性能高，支持动态创建的元素）
    作用：给匹配到的元素绑定事件，对支持动态创建的元素有效
    // 第一个参数：selector，要绑定事件的元素
    // 第二个参数：事件类型
    // 第三个参数：事件处理函数
    $(".parentBox").delegate("p", "click", function(){
        //为 .parentBox下面的所有的p标签绑定事件
    });
    与前两种方式最大的优势：减少事件绑定次数提高效率，支持动态创建出来的元素绑定事件！

    on方式（最现代的方式，兼容zepto(移动端类似jQuery的一个库))
    jQuery1.7版本后，jQuery用on统一了所有的事件处理的方法
    作用：给匹配的元素绑定事件，包括了上面所有绑定事件方式的优点
    语法：
    // 第一个参数：events，绑定事件的名称可以是由空格分隔的多个事件（标准事件或者自定义事件）
    // 第二个参数：selector, 执行事件的后代元素
    // 第三个参数：data，传递给处理函数的数据，事件触发的时候通过event.data来使用
    // 第四个参数：handler，事件处理函数
    $(selector).on(events[,selector][,data],handler);

        // 表示给$(selector)绑定事件，当必须是它的内部元素span才能执行这个事件
    $(selector).on( "click","span", function() {});

    // 绑定多个事件
    // 表示给$(selector)匹配的元素绑定单击和鼠标进入事件
    $(selector).on(“click mouseenter”, function(){});

JQ事件解绑
    	unbind() 方式
        作用：解绑 bind方式绑定的事件
        $(selector).unbind(); //解绑所有的事件
        $(selector).unbind(“click”); //解绑指定的事件
    	undelegate() 方式
        作用：解绑delegate方式绑定的事件
        $( selector ).undelegate(); //解绑所有的delegate事件
        $( selector).undelegate( “click” ); //解绑所有的click事件

    off解绑on方式绑定的事件（重点）
        // 解绑匹配元素的所有事件
        $(selector).off();
        // 解绑匹配元素的所有click事件
        $(selector).off(“click”);
        // 解绑所有代理的click事件，元素本身的事件不会被解绑 
        $(selector).off( “click”, "**" ); 

JQ事件触发
    简单事件触发
    $(selector).click(); //触发 click事件
    trigger方法触发事件
    $(selector).trigger(“click”);
    triggerHandler触发 事件处理函数，不触发浏览器行为
    比如:文本框获得焦点的默认行为
    $(selector).triggerHandler(“focus”);

jQuery事件对象
    event.data 					传递给事件处理程序的额外数据
    event.currentTarget 		等同于this，当前DOM对象
    event.pageX 				鼠标相对于文档左部边缘的位置
    event.target 				触发事件源，不一定===this
    event.stopPropagation()；   阻止事件冒泡
    event.preventDefault(); 	阻止默认行为
    event.type 					事件类型：click，dbclick…
    event.which 				鼠标的按键类型：左1 中2 右3
    event.keyCode				键盘按键代码

JQ链式编程： 原理---return this;
    隐式迭代:在方法的内部会为匹配到的所有元素进行循环遍历，执行相应的方法；而不用我们再进行循环，简化我们的操作，方便我们调用。
    如果获取的是多元素的值，大部分情况下返回的是第一个元素的值。$(“li”).css(“font-size”); // 获取的是第一个li的样式

    each方法
    有了隐式迭代，为什么还要使用each函数遍历？
    大部分情况下是不需要使用each方法的，因为jQuery的隐式迭代特性。
    如果要对每个元素做不同的处理，这时候就用到了each方法

    作用：遍历jQuery对象集合，为每个匹配的元素执行一个函数
    // 参数一表示当前元素在所有匹配元素中的索引号
    // 参数二表示当前元素（DOM对象）
    $(selector).each(function(index,element){});


多库共存
    此处多库共存指的是：jQuery占用了$ 和jQuery这两个变量。当在同一个页面中引用了jQuery这个js库，并且引用的其他库（或者其他版本的jQuery库）中也用到了$或者jQuery这两个变量，那么，要保证每个库都能正常使用，这时候就有了多库共存的问题。

    // 模拟另外的库使用了 $ 这个变量
    // 此时，就与jQuery库产生了冲突
    var $ = { name : “itecast” };

    解决方式：
    // 作用：让jQuery释放对$的控制权，让其他库能够使用$符号，达到多库共存的目的。此后，只能使用jQuery来调用jQuery提供的方法
        $.noConflict();
    举例：
        <script>
            /*var $ = 123;

            console.log($);
            // noConflict 释放对$符号的控制权
            $.noConflict();
            jQuery(function () {
                jQuery("li").css("color", "red");
            });*/
            // 如果 $和jQuery这两个都被占用了，那么还可以用 noConflict
            var J = $.noConflict();
            console.log(J);
            var $ = 123;
            var jQuery = 456;
        </script>   

jQuery插件机制
    jQuery这个js库，虽然功能强大，但也不是面面俱到包含所有的功能。
    jQuery是通过插件的方式，来扩展它的功能：
    当你需要某个插件的时候，你可以“安装”到jQuery上面，然后，使用。
    当你不再需要这个插件，那你就可以从jQuery上“卸载”它。
    （联想：手机软件，安装的app就好比插件，用的时候安装上，不用的时候卸载掉）
    

    第三方插件
        jQuery.color.js
        animate()自定义动画：不支持背景的动画效果
        animate动画支持的属性列表
        jQuery.lazyload.js
            使用步骤：
                1.	引入jQuery文件
                2.	引入插件
                3.	使用插件
    制作插件
        如何创建jQuery插件：
        http://learn.jquery.com/plugins/basic-plugin-creation/

        给全局jQuery函数扩展方法
        $.pluginName = function() {};
        // 调用
        $.pluginName();

        给jQuery对象扩展方法
        $.fn.pluginName = function() {};
        $(“div”).pluginName();


jQueryUI
    jQueryUI专指由jQuery官方维护的UI方向的插件。
    官方API：http://api.jqueryui.com/category/all/
    其他教程：jQueryUI教程
    基本使用:
        1.	引入jQueryUI的样式文件
        2.	引入jQuery
        3.	引入jQueryUI的js文件
        4.	使用jQueryUI功能
            
  // 函数声明
  function aa() {}
  // 函数表达式
  var func = function funcName (num1) {
    console.log(funcName);
  };

切记：
window.onload = function(){
    var lis = document.getElementByTagName("li");
    for(var i = 0 ; i < lis.length;i++) {
        lis[i].onclick = (function(){
            return function(){
            alert(num);
            }
        })(i);
    }    
}


1. 常用正则表达式
    一、校验数字的表达式
    1 数字：^[0-9]*$
    2 n位的数字：^\d{n}$
    3 至少n位的数字：^\d{n,}$
    4 m-n位的数字：^\d{m,n}$
    5 零和非零开头的数字：^(0|[1-9][0-9]*)$
    6 非零开头的最多带两位小数的数字：^([1-9][0-9]*)+(.[0-9]{1,2})?$
    7 带1-2位小数的正数或负数：^(\-)?\d+(\.\d{1,2})?$
    8 正数、负数、和小数：^(\-|\+)?\d+(\.\d+)?$
    9 有两位小数的正实数：^[0-9]+(.[0-9]{2})?$
    10 有1~3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$
    11 非零的正整数：^[1-9]\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\+?[1-9][0-9]*$
    12 非零的负整数：^\-[1-9][]0-9"*$ 或 ^-[1-9]\d*$
    13 非负整数：^\d+$ 或 ^[1-9]\d*|0$
    14 非正整数：^-[1-9]\d*|0$ 或 ^((-\d+)|(0+))$
    15 非负浮点数：^\d+(\.\d+)?$ 或 ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$
    16 非正浮点数：^((-\d+(\.\d+)?)|(0+(\.0+)?))$ 或 ^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$
    17 正浮点数：^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$ 或 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
    18 负浮点数：^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$ 或 ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
    19 浮点数：^(-?\d+)(\.\d+)?$ 或 ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$
    二、校验字符的表达式
    1 汉字：^[\u4e00-\u9fa5]{0,}$
    2 英文和数字：^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$
    3 长度为3-20的所有字符：^.{3,20}$
    4 由26个英文字母组成的字符串：^[A-Za-z]+$
    5 由26个大写英文字母组成的字符串：^[A-Z]+$
    6 由26个小写英文字母组成的字符串：^[a-z]+$
    7 由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$
    8 由数字、26个英文字母或者下划线组成的字符串：^\w+$ 或 ^\w{3,20}$
    9 中文、英文、数字包括下划线：^[\u4E00-\u9FA5A-Za-z0-9_]+$
    10 中文、英文、数字但不包括下划线等符号：^[\u4E00-\u9FA5A-Za-z0-9]+$ 或 ^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$
    11 可以输入含有^%&',;=?$\"等字符：[^%&',;=?$\x22]+
    12 禁止输入含有~的字符：[^~\x22]+
    三、特殊需求表达式
    1 Email地址：^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
    2 域名：[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?
    3 InternetURL：[a-zA-z]+://[^\s]* 或 ^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$
    4 手机号码：^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$
    5 电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)：^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$ 
    6 国内电话号码(0511-4405222、021-87888822)：\d{3}-\d{8}|\d{4}-\d{7}
    7 身份证号(15位、18位数字)：^\d{15}|\d{18}$
    8 短身份证号码(数字、字母x结尾)：^([0-9]){7,18}(x|X)?$ 或 ^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$
    9 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$
    10 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
    11 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$  
    12 日期格式：^\d{4}-\d{1,2}-\d{1,2}
    13 一年的12个月(01～09和1～12)：^(0?[1-9]|1[0-2])$
    14 一个月的31天(01～09和1～31)：^((0?[1-9])|((1|2)[0-9])|30|31)$ 
    15 钱的输入格式：
    16    1.有四种钱的表示形式我们可以接受:"10000.00" 和 "10,000.00", 和没有 "分" 的 "10000" 和 "10,000"：^[1-9][0-9]*$ 
    17    2.这表示任意一个不以0开头的数字,但是,这也意味着一个字符"0"不通过,所以我们采用下面的形式：^(0|[1-9][0-9]*)$ 
    18    3.一个0或者一个不以0开头的数字.我们还可以允许开头有一个负号：^(0|-?[1-9][0-9]*)$ 
    19    4.这表示一个0或者一个可能为负的开头不为0的数字.让用户以0开头好了.把负号的也去掉,因为钱总不能是负的吧.下面我们要加的是说明可能的小数部分：^[0-9]+(.[0-9]+)?$ 
    20    5.必须说明的是,小数点后面至少应该有1位数,所以"10."是不通过的,但是 "10" 和 "10.2" 是通过的：^[0-9]+(.[0-9]{2})?$ 
    21    6.这样我们规定小数点后面必须有两位,如果你认为太苛刻了,可以这样：^[0-9]+(.[0-9]{1,2})?$ 
    22    7.这样就允许用户只写一位小数.下面我们该考虑数字中的逗号了,我们可以这样：^[0-9]{1,3}(,[0-9]{3})*(.[0-9]{1,2})?$ 
    23    8.1到3个数字,后面跟着任意个 逗号+3个数字,逗号成为可选,而不是必须：^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$ 
    24    备注：这就是最终结果了,别忘了"+"可以用"*"替代如果你觉得空字符串也可以接受的话(奇怪,为什么?)最后,别忘了在用函数时去掉去掉那个反斜杠,一般的错误都在这里
    25 xml文件：^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$
    26 中文字符的正则表达式：[\u4e00-\u9fa5]
    27 双字节字符：[^\x00-\xff]    (包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))
    28 空白行的正则表达式：\n\s*\r    (可以用来删除空白行)
    29 HTML标记的正则表达式：<(\S*?)[^>]*>.*?</\1>|<.*? />    (网上流传的版本太糟糕，上面这个也仅仅能部分，对于复杂的嵌套标记依旧无能为力)
    30 首尾空白字符的正则表达式：^\s*|\s*$或(^\s*)|(\s*$)    (可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式)
    31 腾讯QQ号：[1-9][0-9]{4,}    (腾讯QQ号从10000开始)
    32 中国邮政编码：[1-9]\d{5}(?!\d)    (中国邮政编码为6位数字)
    33 IP地址：\d+\.\d+\.\d+\.\d+    (提取IP地址时有用)

    密码的： /^[A-Z]{6,18}|[a-z]{6,18}|[0-9]{6,18}$/  只有数字或者字母

    /^([a-z].*[A-Z])|([A-Z].*[a-z])/   有大小写的字母

    /^([a-z].*[0-9])|([A-Z].*[0-9])|[0-9].*[a-zA-Z]/

    /^[A-Za-z0-9]+[_][A-Za-z0-9]*$/  



声明和使用
    @正则的声明和使用
    通过构造函数定义
    var 变量名= new RegExp(/表达式/);
    通过直接量定义（简单方便，我们一般用这个）
    var 变量名= /表达式/;
    常用方法，可用于检测传入的字符串是否符合该规则并返回布尔值
    exp.test("要检测的字符串")
预定义类
    @预定义类和转义符
    .	[^\n\r]	除了换行和回车之外的任意字符
    \d	[0-9]		数字字符digit
    \D	[^0-9]	非数字字符
    \w	[a-zA-Z0-9_]	单词字符(所有的字母数字和_) word
    \W	[^a-zA-Z0-9_]	非单词字符
    \s	[\f\r\n\t\v]	不可见字符 space
    \S	[^\f\r\n\t\v]	可见字符
    转义符
    \f 表示换页 form feed
    \t 表示水平制表符 table
    \v 表示垂直制表符 vertical table
    
    \r,\n,\r\n的区别
        在万恶的旧社会，打字机换行（\n newline）之后只会下移一行，需要回到一行的开头（\r return）才能继续打字
        老式的操作系统也继承了打字机的这一特性，但用户换行之后一般都是要回到开头的，因此新式的操作系统为了方便将键盘上的Enter键的含义修改为\r\n
字符类
    @字符类
    简单类[abc] 表示该位置可以出现的字符
    负向类[^abc] 表示该位置不可以出现的字符
    范围类[a-e]  表示该位置可以出现的字符的范围
    组合类[a-xA-E0-9] 范围类的组合

边界 量词 括号
    @边界
    ^ 会匹配行或者字符串的起始位置
    ^只有在[]内才表示非 在外边表示开始
    $ 会匹配行或字符串的结尾位置
    ^$在一起 表示必须是这个（精确匹配）
    @量词
    "*"	重复零次或更多 x>=0
    "+"	重复一次或更多次 x>=1
    "?"	重复零次或一次  x=(0||1)
    {n}	n次	x=n
    {n,}	重复n次或更多  x>=n
    {n,m} 重复出现的次数比n多但比m少 n<=x<=m
    @括号总结
    ()表示一组
    []表示一个字符的位置
    {}表示次数

常见项目的匹配
    常见项目的匹配网上有很多（例如搜索常用正则表达式大全），无需记忆，能看懂即可
    匹配国内电话号码：
    /^0\d{2,3}-\d{7,8}$/
    匹配姓名：
    /^[\u4e00-\u9fa5]{2,}$/
    匹配腾讯QQ号：
    /^[1-9]\d{4,10}$/
    匹配手机号：
    /^(13[0-9]|14[57]|15[0-9]|18[0-9])\d{8}$/
    匹配邮箱：
    /^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

封装自己的trim方法
    replace() 方法     格式:
    字符串对象.replace(正则式或字符串，替换的目标字符)
    用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的字符串
    返回值:
    一个新的字符串，是用 replacement 替换了 regexp 的第一次匹配或所有匹配之后得到的
    正则表达式的常见匹配模式
    g 全局模式（Global），在匹配时查找所有字符串，而非发现一个就停止
    i 忽略大小写模式（IgnoreCase），在匹配时忽略大小写
    m 多行模式（multiline），在匹配至一行文本末尾后，还会继续匹配下一行
    @封装自己的trim()方法
        function trim(str) {
            return str.replace(/^\s+/,"").replace(/\s+$/,"");
        }
    @使用trim()方法检测用户输入
      function trim(str) {
        return str.replace(/^\s+|\s+$/g, "");
    }

    		var myTrim = function ( str ) {
				if ( String.prototype.trim ) {
					return str.trim();
				} else {
					return str.replace( /^\s+|\s+$/g, '' );
				}
			};x

面向对象：
对象
    数据类型
    基本数据类型 string number boolean null undefined
    复杂数据类型 Object
    什么是对象
    对象其实就是一组数据和功能的集合
    对象可以方便地描述和模拟客观事物

@对象的创建和使用
    通过构造函数声明
    var obj = new Object();    
    通过直接量声明
    var obj = {};

创建对象
    var obj = {};
    obj.name = "刘德华";
    obj.age = 55;
    obj.showName = function () {
        alert("Hi, my name is " + person.name);
    }
    obj.showAge = function () {
        alert("Hi, I'm " + person.age);
    }

使用对象
    console.log(obj.name);  // 调用属性
    console.log(obj.age);
    obj.showName();   //  调用方法
    obj.showAge();

面向对象OOP
    Object Orented Programming 面向对象的程序设计
    因为对象可以方便地描述和模拟客观事物，使项目（尤其是大型项目）的开发能够模块化，便于大规模协同开发和维护，所以面向对象的开发语言和面向对象的程序设计越来越流行，这一点在后面的项目中大家会有深刻的体会。

工厂模式创建对象
    为什么要优化创建对象的方式
    因为对象在项目中被大规模的使用，所以每一点小小的改进都会对项目整体效率带来很大的提升，现阶段同学们还不可能有深刻的体会，只是让大家了解一下，后面讲项目大家自然就明白了。
    @工厂模式
    同类型对象，只是一些属性的值不同，通过对象字面量创建对象每次都要写那么多东西很费劲，我们可以将创建对象的过程封装进一个函数，只把发生变化的属性作为参数传入，从而简化对象创建的过程。
    但是工厂模式只是创建出来一个普通的对象并将其返回，因此无法判断实例的具体类型。

构造函数模式创建对象
    @this和new关键字
    利用new 关键字可以声明新的对象
    new运算符的作用是创建一个对象实例。这个对象可以是用户自定义的，也可以是带构造函数的一些系统自带的对象。
    new 关键字可以让 this 指向新的对象
    @构造函数模式
    所谓"构造函数"，其实就是一个普通函数，但是内部使用了this变量。对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上。这样通过instanceof就可以判断实例的类型了。

原型模式创建对象
    @原型prototype简介
    每个函数都有一个prototype属性，这个属性是指向一个对象的引用，这个对象称为原型对象，原型对象包含函数实例共享的方法和属性，也就是说将函数用作构造函数调用的时候，新创建的对象会从原型对象上继承属性和方法。使用prototype的好处是可以让所有对象实例共享它所包含的属性和方法。

    原型的使用格式：
    类名.prototype.属性名 = 属性值
    类名.prototype.方法名 = function () {}
    可以把那些不变的属性和方法，直接定义在prototype上，这样可以避免创建多个重复方法。

    @原型模式
    主要解决：函数因为使用非常非常多，重复执行效率太低。
    Person.prototype.showName = function() {  // 用的共同的父亲
        alert("我的名字是"+ this.name);
    }

什么是闭包
闭包是指有权访问另一个函数作用域中的变量的函数

@体验闭包
    function outerFun() {
        var a = 0;
        function innerFun() {
            a++;//包的是变量
            alert(a);
        }//这就是个包
        return innerFun;  //注意这里
    }
    var obj = outerFun();
    obj(); obj();
    var obj2 = outerFun();
    obj2(); obj2();
    函数变量被隐藏在作用域链内，看起来就像是函数将变量包裹了起来（所以叫闭包）（闭包包的是变量）

    函数的内部变量是局部变量，局部变量一般是不可以被别人随便使用的
    @局部变量外部不可用
    但是如果另一个函数在这个函数的作用域链内，就可以访问了
    @函数作用域链内可用
    我们可以通过将函数作用域链内的函数返回的形式，让外部访问该函数内部的变量
    @抛出函数作用域链内的函数

闭包的应用
    闭包的主要应用就是特权方法，特权方法能够让外界对函数内部的私有变量进行受限制的访问。这一特性在某些项目的开发中会非常常见。
    @通过特权方法访问私有变量
    有时候有些属性不能直接暴露给外界直接访问，例如OA系统中的工资，只能本人才能查看这时我们需要将工资这个属性设置为私有变量，并让外界通过特权方法进行有条件的访问。
闭包的优点 ： 
    优点：不产生全局变量，实现属性私有化。
    缺点：闭包中的数据会常驻内存，在不用的时候要手动删除，否则会导致内存溢出。




offset系列
    offsetWidth和offsetHeight
        用来得到对象的大小
    @offsetHeight和style.height的区别
        style.height是字符串，offsetHeight是数值
        demo.style.height是用来获取和设置行内样式的，offsetHeight是只读属性
        demo.style.height只能获取和设置行内样式，如果样式写到了其他地方，甚至根本就没写，便无法获取
        因此，工作中一般用demo.offsetHeight来获取某元素的真实宽度/高度，用style.height来设置宽度/高度
    @offsetHeight的构成
        offsetHeight = height+padding+border
        包括 自身高度 内边距 边框 不包括 外边距

offsetLeft和offsetTop
    用来得到对象的位置（注意：没有offsetRight和offsetBottom）
@offsetLeft的构成
    到最近的（带有定位的）父元素的 左侧/顶部 的距离
    如果所有父级都没有定位则以body 为准
    offsetLeft 是自身border左侧到父级padding左侧的距离
    

@offsetLeft和style.left的区别
    一、style.left只能获取行内样式
    二、offsetLeft只读，style.left可读可写
    三、offsetLeft是数值，style.left是字符串并且有单位px
    四、如果没有加定位，style.left获取的数值可能是无效的
    五、最大区别在于offsetLeft以border左上角为基准，style.left以margin左上角为基准

offsetParent
    @offsetParent爸爸去哪
    返回该对象距离最近的带有定位的父级
    如果当前元素的所有父级元素都没有定位（position为absolute或relative），offsetParent为body
    如果当前元素的父级元素中有定位（position为absolute或relative），offsetParent取最近的那个父级元素
    另外注意offsetParent与parentNode的区别parentNode只找自己的上一级（亲爹）


不用死记，offset是计算偏移的，要算都算要不算都不算，只要记住和定位有关就行了，margin、border、padding要算都算要不算都不算，实在需要区分，用的时候自己写个div试一试或者网上一查就知道了。

Math对象
    @Math对象常用方法
    天花板 向上取整 负数取更大的
    Math.ceil(x)
    地板 向下取整 负数取更小的
    Math.floor(x)
    就近取整 四舍五入
    Math.round(x)
    取绝对值
    Math.abs(x)

动画原理
    @体验页面动画
动画原理公式
    动画原理公式：  leader = leader + step
    leader表示盒子当前位置
    step表示步长
    box.style.left = box.offsetLeft + 10 + "px";
    让setInterval不断执行某个函数修改盒子的位置属性最后就实现了动画的效果
动画函数封装
    @动画函数封装
    动画函数较为复杂，却又很常用对于这样的函数，我们一般都会进行封装
    需求：能够让任意对象移动到指定位置。
动画函数改进
    @动画函数改进
    然而封装之后的函数还有很多问题，所以我们要对其进行进一步改进
    判断运动方向
    完善终点检测
    终点清除定时器
    手动设置对象位置到终点
    调用开始先清理定时器，防止多次调用


缓动动画
原理公式
    动画公式
    leader = leader + step
    匀速动画公式
    step = 定值
    leader = leader + step
    缓动动画公式
    step = ( target - leader ) / 10
    leader = leader + step
缓动动画的好处
    他的移动是有尽头的。不像基础匀速运动那样无限移动。
    有非常逼真的缓动效果，实现的动画效果更细腻。
    如果不清除定时器，物体永远跟着目标leader在移动。


document.documentElement --- 文档的根节点
    文档的兼容模式
    document.compatMode
    BackCompat   未声明DTD（怪异模式）
    CSS1Compat  已经声明DTD（标准模式）
    @窗体的滚动事件
    窗体每滚动一像素都会触发该事件
    window.onscroll = function () { 语句 }

scroll正传
    @scrollHeight和scrollWidth
    对象内部实际内容的高度/宽度
    @scrollTop和scrollLeft
    被卷去部分的 顶部/左侧 到可视区域 顶部/左侧 的距离
页面滚动座标
    @页面滚动座标的兼容写法
    页面滚动座标非常常用，但是有很大的兼容性问题
    正常浏览器（除了ie678之外的浏览器）
    window.pageYOffset
    已经声明DTD（标准模式）
    document.documentElement.scrollTop
    未声明 DTD（怪异模式）
    document.body.scrollTop
    可以合写为
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

client正传
    @clientWidth和clientHeight：
    偏移offsetWidth: width  +  padding  +  border
    卷曲scrollWidth: width  +  padding  不包含border   内部内容的大小
    可视clientWidth: width  +  padding  不包含border
clientTop和clientLeft
    clientTop和clientLeft没用，他们通常指的就是border的距离（如果有滚动条会包含滚动条的宽度）
    谁见过滚动条在顶部或者左侧的？！

网页可视区宽高
    @网页可视区宽高的兼容写法
    页面可视区宽高非常常用，但是有很大的兼容性问题
    正常浏览器（包括IE9+）
    window.innerWidth
    标准模式（包括IE9-）
    document.documentElement.clientWidth
    怪异模式 
    document.body.clientWidth
    因此，可以合写为
    var clientWidth = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth|| 0;
    @封装自己的client()
    由于非常常用，我们可以模仿JQuery封装一个自己的client()方法，返回可视区宽度和高度
    @体会响应式布局原理
    当我们的页面宽度 大于 960 像素的时候 页面为红色并显示computer
    当我们的页面宽度 大于 640 小于 960 页面为绿色并显示tablet 
    剩下的页面为蓝色并显示mobile
三大系列总结
    offsetWidth	    scrollWidth 	clientWidth
    offsetHeight	scrollHeight	clientHeight
    offsetLeft		scrollLeft		clientLeft
    offsetTop		scrollTop		clientTop
    offsetParent	scroll()		client()

获取样式属性
    @访问属性的两种方式
        对象有 属性和方法  属性不带括号
        比如，有一个div我们想得到他的宽度，可以通过div.style.width
        这样的写法虽然简单，但是不灵活，没有办法通过传参的形式获取属性
        因此我们还有另外一种写法
        div.style["width"]
    @获取当前样式属性的方法
        工作中我们经常需要获取一个盒子的最终样式
        然而 通过 div. style.left 只能得到行内样式，而样式可能来自 内嵌 或者 外链 的样式表
        我们前面学过的offsetLeft也只能得到距离offsetParent左侧的距离
        那么如何到计算后的样式属性值呢：
        IE
        div.currentStyle.left或 div.current["left"]
        w3c  
        window.getComputedStyle(元素,伪元素)["left"]
        一般情况下没有伪元素，我们用 null 来替代。
    @封装获取样式属性值的兼容方法
        //需求 获取任意对象的任意属性

事件对象简介
    @事件对象简介
        在触发事件时，会产生一个事件对象event，这个对象中包含着与事件有关的信息。
        所有浏览器都支持event对象，但支持的方式不同。
        比如鼠标操作时候，会添加鼠标位置的相关信息到事件对象中。
        普通浏览器支持 传入参数
        ie 678 支持 window.event
    @事件对象的兼容性写法
    var event = event || window.event;

clientX   clientY
当前窗口的左上角为基准点
pageX    pageY
以当前文档的左上角为基准点
screenX  screenY
当前屏幕的左上角为基准点


事件冒泡简介
    当一个元素上的事件被触发的时候，比如说鼠标点击了一个按钮，同样的事件将会在那个元素的所有祖先元素中被触发。这一过程被称为事件冒泡；这个事件从原始元素开始一直冒泡到DOM树的最上层。
    顺序
    IE 6.0: 
    div -> body -> html -> document
    其他浏览器: 
    div -> body -> html -> document -> window
    不是所有的事件都能冒泡。以下事件不冒泡：blur、focus、load、unload
    @冒泡的逻辑问题
阻止冒泡的方法
    标准浏览器 和  ie浏览器  
    w3c的方法是event.stopPropagation()   propagation  传播          
    IE678是event.cancelBubble = true   bubble 泡泡  冒泡    
    @阻止事件冒泡
    兼容的写法： 
    if(event && event.stopPropagation)
    {
    event.stopPropagation();  //  w3c 标准
    } else {
    event.cancelBubble = true;  // ie 678  ie浏览器
    }

事件目标 targetId
    返回当前事件对象的id
    火狐谷歌等 event.target.id
    IE678      event.srcElement.id
    兼容性写法：
    var targetId = event.target ? event.target.id : event.srcElement.id;

简单数据类型。
	String        Number      Boolean        null       undefined
	字符串       数字        布尔           空         未定义
	“”         0123        true/false       自己       还没有定义
	
	String类型转换
		1. 变量+ '''' 
		2. String(变量)
		3. a++  a= a+1  不是一样的：a是String类型的时候后面的结果是a1;
	Number类型
		1、进制问题。
			var result = 0xb;  //表示十六进制
			var result1 = 020;//表示八进制

        2、丢失精度。
			0.1+0.2 = 0.30000000000000004
	    3、数据类型转换
			1. x-1  x*1  x/1      变成Number类型（只有String类型）
			2. Number(变量)
			如果变量中包含字母，返回一个NaN.
    Boolean类型
	      1. 使用 !!（boolean值不变）
	          false、undefined 、null、0、“” 为 false
	          true、1、“somestring”、[Object] 为 true
	  	  2. Boolean();
		  任何数据类型，都可以转换成布尔类型。
	null和undefined（任何数字和undefined相加(运算)都是NaN）
		null和undefined有最大的相似性。看看null == undefined的结果(true)也就更加能说明这点。不过相似归相似，还是有区别的，就是和数字运算时，10 + null结果为：10；10 + undefined结果为：NaN。
复杂数据类型。
	对象（Object），函数(function)，数组（array），日期(Date)，正则...........
    两个内置小方法
    parseInt（）；取整
		1、取整 parseInt(只能放一个值);  首个字符必须为数字。Or:NaN.
		2、parseInt(变量，进制) ：这个方法能够让一个指定进制的数变为十进制。
		       十进制值=parseInt(a,进制)  （你告诉我进制，我就敢给你转换成十进制）
		        指定进制的值 = number(十进制).toString(指定的进制);
		       （你给我一个十进制的值，在告诉我进制，我就能转换成那个进制的值）
		通过这两个方法我们可以完成，任意进制的转换。
	parseFloat（）; 取小数
	只有一个用法就是：取值（取小数）。

js丢失精度问题:
由于javascript是一种弱类型的语言，当我们进行小数运算时，会出现丢失精度的问题，如计算0.2 + 0.1，得到的结果不是0.3，而是0.30000000000000004


隐藏盒子
  display： none;             隐藏盒子。（不占位置）
  visibility：hidden;         隐藏盒子。（占位置）
  overflow: hidden;           隐藏超出盒子的部分。

显示盒子
  display： block;             显示盒子。
  visibility：visible；        显示盒子。

Js加载问题
  js的加载时和html同步。（顺序加载，加载到谁，就执行谁。）
  Css和html是不同步加载的。（先加载HTML，后加载css。）

label  for  id
	<label for="inp">请输入一个名人：</label>
	<input type="text" id="inp"/>
	label标签使用：点击label内容,插入条光标会调到for指定的id的标签中。
	   (为他人做嫁衣，为for指定的id所在的标签)
oninput/onblur/onchange   区别与联系
	oninput: 输入事件。    只要输入或删除字母或数字都会触动这个事件。
	onblur: 失去焦点事件。 只要标签失去焦点，就会触动这个事件。
	onchange: 改变事件。   只要事件源的值被改变，就会触动这个事件。
    有一个input，值:    请输入...
	1.  点击之后离开。     2.输入一个文字就离开。3.入一个文字在删除他在离开。 



join 把数组变成字符串
	作用是将数组各个元素是通过指定的分隔符进行连接成为一个字符串。
	调用者：数组本身。    有没有参数都行。    有返回值（string）。
	把调用者数组中的元素按照参数链接成一个字符串，如果没有参数用逗号链接。
	字符串 = 数组.join(可选); 数组中的元素链成字符串。

	1．参数可选。指定要使用的分隔符。
	2．如果省略该参数，则使用逗号作为分隔符。
	3．如果想让数组中元素无缝链接，用“”；
	4．如果你使用空格分隔，那么他真的给你用空格分隔啊！！！“”
split 把字符串变成数组。   
	split() 方法用于把一个字符串分割成字符串数组
	调用者：字符串。    有没有参数都行。    有返回值（Array）。
	把字符串按固定的方式分割成一个数组，参数1用什么字符分割，参数2数组最大长度。
	数组 = 字符串.split(用什么分，分割成功后数组最大长度); 把字符串分割成数组。

	参数 1。指定要使用的分隔符。
	参数2，可选。该参数可指定返回的数组的最大长度。
	数组切割完成后，用于切割的字符串不会出现在数组元素当中。（卸磨杀驴）
	如果是空字符串，会把每一个字符全部当做数组中的元素来截取。
select标签本身的value值给了下面的标签option，所以option的value值就是select的value值。有selected这个属性的option标签是被选定或默认的标签。
onchange事件这个事件是在value值被更的时候触发的。一旦value值被更改就会触动这个事件。


兄弟节点 Sibling就是兄弟的意思。
	Next：下一个的意思。
	Previous:前一个的意思。
	nextSibling：调用者是节点。IE678中指下一个元素节点（标签）。在火狐谷歌IE9+以后都指的是下一个节点（包括空文档和换行节点）。
	nextElementSibling：在火狐谷歌IE9都指的是下一个元素节点。
	总结：在IE678中用nextSibling，在火狐谷歌IE9+以后用nextElementSibling
	下一个兄弟节点=节点.nextElementSibling || 节点.nextSibling

previousSibling：调用者是节点。IE678中指前一个元素节点（标签）。在火狐谷歌IE9+以后都指的是前一个节点（包括空文档和换行节点）。
	previousElementSibling：在火狐谷歌IE9都指的是前一个元素节点。
	总结：在IE678中用previousSibling，在火狐谷歌IE9+以后用previousElementSibling。
	下一个兄弟节点=节点.previousElementSibling|| 节点.previousSibling

单个子节点
	firstChild：调用者是父节点。IE678中指第一个子元素节点（标签）。在火狐谷歌IE9+以后都指的是第一个节点（包括空文档和换行节点）。
	firstElementChild:在火狐谷歌IE9都指的第一个元素节点。
	第一个子节点=父节点.firstElementChild || 父节点.firstChild

lastChild:调用者是父节点。IE678中指最后一个子元素节点（标签）。在火狐谷歌IE9+以后都指的是最后一个节点（包括空文档和换行节点）。
	lastElementChild：在火狐谷歌IE9都指的最后一个元素节点。
所有子节点
	childNodes：它是标准属性，它返回指定元素的子元素集合，包括HTML节点，所有属性，文本节点   （他还是W3C的亲儿子 ）
	火狐 谷歌等高本版会把换行也看做是子节点
	nodeType==1时才是元素节点(标签)
		nodeType  ==  1  表示的是元素节点   记住   元素就是标签
		nodeType  ==  2  表示是属性节点   了解
		nodeType  ==  3  是文本节点   了解
	子节点数组 = 父节点.childNodes;   获取所有节点。
	children：非标准属性，它返回指定元素的子元素集合。
	但它只返回HTML节点，甚至不返回文本节点，虽然不是标准的DOM属性，但它和innerHTML方法一样，得到了几乎所有浏览器的支持。
	children在IE6/7/8中包含注释节点 
	在IE678中，注释节点不要写在里面。
	子节点数组 = 父节点.children;   用的最多。
补充
	节点自己.parentNode.children[index];随意得到兄弟节点。

	作为了解内容：
	function siblings(elm) {
			var a = [];
			var p = elm.parentNode.children;
			for(var i =0,pl= p.length;i<pl;i++) {
				if(p[i] !== elm) a.push(p[i]);
			}
			return a;
	}
	定义一个函数。必须传递自己。定义一个数组，获得自己的父亲，在获得自己父亲的所有儿子（包括自己）。遍历所哟与的儿子，只要不是自己就放进数组中。

只需要明白两个属性（！！！重点！！！）
	parentNode   和  children  这两个属性。
DOM节点操作 （！！！！！重点！！！！！）
	节点的访问关系都是属性。节点的操作都是函数或者方法。
创建节点
	使用方法是这样的document.createElement();
	新的标签（节点） = document.createElement(“标签名”);
插入节点（使用节点）
	使用方法： 父节点.appendChild();
	父节点.appendChild(新节点); 父节点的最后插入一个新节点

	使用方法：父节点.insertBefore(要插入的节点，参考节点)；
	父节点.insertBefore(新节点,参考节点)在参考节点前插入;
删除节点   
	用法：用父节点删除子节点。
	父节点.removeChild（子节点）；必须制定要删除的子节点
	节点自己删除自己：
	不知道父级的情况下，可以这么写：node.parentNode.removeChild(node)
复制节点 （    oldNode.cloneNode（true）  ）
	想要复制的节点调用这个函数cloneNode()，得到一个新节点。 方法内部可以传参，入股是true，深层复制，如果是false，只复制节点本身。
	新节点=要复制的节点.cloneNode(参数) ; 参数可选复制节点
	用于复制节点， 接受一个布尔值参数， true 表示深复制（复制节点及其所有子节点）， false 表示浅复制（复制节点本身，不复制子节点）
节点属性
	获取：getAttribute(名称)
	设置：setAttribute(名称, 值)
	删除：removeAttribute(名称)
	注意：IE6、7不支持。
	调用者：节点。   有参数。   没有返回值。
	每一个方法意义不同。


获取日期和时间
getDate()                 获取日 1-31
getDay ()                 获取星期 0-6（0代表周日）
getMonth ()               获取月 0-11（1月从0开始）
getFullYear ()	           获取完整年份（浏览器都支持）
getHours ()	              获取小时 0-23
getMinutes ()	              获取分钟 0-59
getSeconds ()	              获取秒  0-59
getMilliseconds ()          获取毫秒 （1s = 1000ms）
getTime ()	              返回累计毫秒数(从1970/1/1午夜)


返回距离1970/01/01毫秒数
 var date = Date.now();
 var date = +new Date();
 var date = new Date().getTime();  最常用
 var date = new Date().valueOf();


字符串转换
	1．字符串 = 变量+“”;
	2．字符串 = String(变量)；
	3．字符串 = 变量.toString()；  (任何简单类型)    
	注意：
				Number类型：
	该进制值 = 十进制.toString（进制）
	十进制值 = window.parseInt(数值，进制);
		区别于：String类型中的toString()

charAt，获取相应位置字符（参数： 字符位置）
	返回的字符 = str.charAt(索引)。获得索引处的字符。
	注释：字符串中第一个字符的下标是 0。如果参数 index 不在 0 与 string.length 之间，该方法将返回一个空字符串。

charCodeAt获取相应位置字符编码（参数： 字符位置）
	编码值 = str.charCodeAt(索引);指定位置的字符对应的编码值
	charAt()方法和charCodeAt()方法用于选取字符串中某一位置上的单个字符
	区别：charCodeAt()方法，它并不返回指定位置上的字符本身，而是返回该字符在Unicode字符集中的编码值

indexOf，从前向后索引字符串位置（参数： 索引字符串）
	索引值 = str.indexOf(字符); 从前往后查找。
	从前面寻找第一个符合元素的位置。有多个返回值为第一个。
lastIndexOf，从后向前索引字符串位置（参数：索引字符串）
	索引值 = str.lastIndexOf(字符); 从后往前查找。
	从后面寻找第一个符合元素的位置
	找不到则返回 -1

编码和解码
	 encodeURIComponent() 函数可把字符串作为 URI 组件进行编码
	 decodeURIComponent() 函数可把字符串作为 URI 组件进行解码
	var url = "http://www.itcast.cn?name=supperBrother&password=shuai";
	//编码：将非标准字符全部编码
	var enUrl = encodeURIComponent(url);//encodeURI(url); 
	//解码：转换为原始形式
	var deUrl = decodeURIComponent(enUrl);//decodeURI(enUrl);

字符串操作
concat，连接字符串（参数： 追加字符串，可以多个）
	返回一个字符串 = str1.concat(str2); 把str1和str2链接起来

slice，截取字符串（参数：1，截取位置【必须】，2终结点）
	字符串 = str.slice（参数1，参数2); 两个参数都是索引值。
	(1).（2,5）  正常包左不包右。
	(2).  ( 2 )   从指定的索引位置剪到最后。
	(3).（-3）   从倒数第几个剪到最后.
	(4).（5,2）  前面的大，后面的小，空。

substr，截取字符串（参数：1，截取位置【必须】，2截取长度）
	字符串 = str.substr（参数1，参数2); 1索引值,2长度。第一个参数为从索引位置取值，第二个参数返回字符长度。
	(1).  （2,4）    从索引值为2的字符开始，截取4个字符。
	(2).  （1）     一个值，从指定位置到最后。
	(3).  （-3）    从倒数第几个剪到最后.
    (4）不包括前大后小的情况。

substring 同slice
字符串 = str.substring（参数1，参数2); 两个参数都是索引值。
  不同1：参数智能调转位置。
  不同2：参数负值，将全部获取字符串。
   （1）.（2,5）   正常包左不包右。
	(2).   ( 2 )    从指定的索引位置剪到最后。
	(3).  （-3）   获取全部字符串.
	(4).  （5,2）   前面的大，后面的小，不是空。（2,5）

转换大小写
	toUpperCase，转换为大写（参数： 无）
	STR = str.toUpperCase(); 转换成大写
	toLowerCase，转换为小写（参数：无）
	str = STR.toLowerCase(); 转换成小写

Number和Math
	Number
		number.toFixed(几位);四舍五入保留
	Math
		Math.random();   (0-1随机数值)
		Math.round();      (四舍五入取整)
		Math.max();        (最大值和NaN)
		Math.max(1,3,"12ab")；Math.max(1,2,NaN)；Math.max(1,2,undefined);  NaN
		Math.max(1,3,"12")；Math.max(1,3,null)；    12  3
		Math.max(1,2,3);    3

arguments.callee == 函数名==函数体（不是执行这个函数）
	arguments.length == 实参的长度。
	arguments == 实参数组。 
	arguments.callee == 所在的函数体。 == 调用函数名。(和this类似)



搭建HTTP服务
安装wampserver

注意事项：
    1、检查网络是不是通的 ping 对方IP
    2、检查防火墙是否开启，如果开启将不能正常被访问
    3、检查访问权限 Allow from all
    4、理解默认索引
    5、确保端口没有被其它程序占用
    6、“#”表示注释
    7、修改配置要格外小心，禁止无意修改其它内容
将我们制作好的网页拷贝到配置好的根目录下，浏览器访问127.0.0.1即可
或者修改配置文件bin\apache\Apache2.2.21\conf\httpd.conf 
    设定根目录 DocumentRoot
    配置根目录 <Directory 之后重启服务

配置虚拟主机
在一台Web服务器上，我们可以通过配置虚拟主机，然后分别设定根目录，实现对多个网站的管理。
具体步骤如下：
    1、开启虚拟主机辅配置，在httpd.conf 中找到 
        #Virtual hosts 
        #Include conf/extra/httpd-vhosts.conf
        去掉前面的#号注释，开启虚拟主机配置
    2、 配置虚拟主机，打开conf/extra/httpd-vhosts.conf 
        分别修改以下三项
        DocumentRoot "E:/www/example"
        ServerName "example.com "
        ServerAlias "www.example.com"
        其它项无需指定。
    3、修改DNS（hosts）文件  注：修改hosts文件权限
        打开C:\Windows\System32\drivers\etc\hosts
        目录是固定的
    4、重启Apache
    5、浏览器访问www.example.com

PHP:
表单处理
    表单name属性的是用来提供给服务端接收所传递数据而设置的
    表单action属性设置接收数据的处理程序
    表单method属性设置发送数据的方式
    当上传文件是需要设置 enctype="multipart/form-data"，且只能post方式
    $_GET接收 get 传值
    $_POST接收 post 传值
    $_FILES接收文件上传
常用PHP函数
    in_array() 是否在数组中
    count() 计算数组长度
    array_key_exists ()检测数组中是否存在key
    file_get_contents读取文件
    ...还有很多

请求行 由请求方式、请求URL和协议版本构成
请求头
    Host：localhost请求的主机
    Cache-Control：max-age=0控制缓存
    Accept：*/* 接受的文档MIME类型
    User-Agent：很重要
    Referer：从哪个URL跳转过来的
    Accept-Encoding：可接受的压缩格式
    If-None-Match：记录服务器响应的ETag值，用于控制缓存
    此值是由服务器自动生成的
    If-Modified-Since：记录服务器响应的Last-Modified值
    此值是由服务器自动生成的
请求主体
    即传递给服务端的数据
    注：当以post形式提交表单的时候，请求头里会设置
    Content-Type: application/x-www-form-urlencoded，以get形式当不需要

响应/响应报文
    响应由服务器发出，其规范格式为：状态行、响应头、响应主体。
状态行 由协议版本号、状态码和状态信息构成
响应头
    Date：响应时间
    Server：服务器信息
    Last-Modified：资源最后修改时间
    由服务器自动生成
    ETag：资源修改后生成的唯一标识
    由服务器自动生成
    Content-Length：响应主体长度
    Content-Type：响应资源的MIME类型
MIME是标识文件类型的，文件后缀并不能正确无误的标识文件的类型。
    思考？客户端与服务器间传递数据时，是以什么形式传输的？
    客户端与服务器在进行数据传输的时候都是以字节形式进行的，咱们可以理解成是以文本形式传输，这时浏览器就需要明确知道该怎么样来解析这些文本形式的数据，MIME就是明确告知浏览器该如何来处理。
响应主体
    即服务端返回给客户端的内容；
状态码
常见的有200代表成功、304文档未修改、403没有权限、404未找到、500服务器错误

协商缓存（性能优化）
    此知识点属性扩展内容，不做具体分析
    前端优化雅虎35条
    http://www.tuicool.com/articles/J3uyaa
    重绘&回流
    http://www.zhangxinxu.com/wordpress/2010/01/%E5%9B%9E%E6%B5%81%E4%B8%8E%E9%87%8D%E7%BB%98%EF%BC%9Acss%E6%80%A7%E8%83%BD%E8%AE%A9javascript%E5%8F%98%E6%85%A2%EF%BC%9F/
    利用浏览器的缓存机制，可以有效的减少HTTP的请求，提高页面加载速度，增强用户体验，同时也能极大的减轻服务器的负担，结合HTTP协议，缓存协商就是根据HTTP协议实现缓存控制的一种机制。
    问题：是否见过某些网站CSS地址后面会带有一些参数，通常为xxx.css?cache=20160106形式
    这种做法是用来强制清除缓存的，实际开发过程中，每当新功能上线时最容易引起BUG的即CSS的缓存，但是浏览器的缓存能减少请求，如果每次都强制清除，会对性能有损失，所以控制浏览器缓存成为前端性能化的一个重点
        1、Last-Modified时间精确到了秒，但如果1秒内修改了多次，并不能精确的更新缓存。
        2、ETag则是判断文件内容任何改变后，便会由服务器自动生成一个唯一标识。
        3、Expires 过期时间，HTTP1.0的规范，一个绝对的时间
        4、Cache-Control HTTP1.1规范，设置过期时间，优先级高于Expires。

我们需要检测并判断响应头的MIME类型后确定使用request.responseText或者request.responseXML


API详解
    xhr.open() 发起请求，可以是get、post方式
    xhr.setRequestHeader() 设置请求头
    xhr.send() 发送请求主体get方式使用xhr.send(null)
    xhr.onreadystatechange = function () {} 监听响应状态
    xhr.readyState = 0时，UNSENT open尚未调用
    xhr.readyState = 1时，OPENED open已调用
    xhr.readyState = 2时，HEADERS_RECEIVED 接收到头信息
    xhr.readyState = 3时，LOADING 接收到响应主体
    xhr.readyState = 4时，DONE 响应完成
    不用记忆状态，只需要了解有状态变化这个概念
    xhr.status表示响应码，如200
    xhr.statusText表示响应信息，如OK
    xhr.getAllResponseHeaders() 获取全部响应头信息
    xhr.getResponseHeader('key') 获取指定头信息
    xhr.responseText、xhr.responseXML都表示响应主体
注：GET和POST请求方式的差异（面试题）
    1、GET没有请求主体，使用xhr.send(null)
    2、GET可以通过在请求URL上添加请求参数
    3、POST可以通过xhr.send('name=itcast&age=10')
    4、POST需要设置 xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    5、GET效率更好（应用多）
    6、GET大小限制约4K，POST则没有限制

兼容性
IE5、IE6中使用 ActiveObject("Microsoft.XMLHTTP")
var request ;
if(XMLHTTPRequest) {
    request = new XMLHTTPRequest;
} else {
    request = new ActiveObject("Microsoft.XMLHTTP");
}


封装AJAX工具函数
    为了提升我们的开发效率，我们自已将XMLHttpRequest封装成一个函数。
jQuery中的Ajax
    jQuery为我们提供了更强大的Ajax封装
    $.ajax({}) 可配置方式发起Ajax请求
    $.get() 以GET方式发起Ajax请求
    $.post() 以POST方式发起Ajax请求
    $('form').serialize() 序列化表单（即格式化key=val&key=val）
    url 接口地址
    type 请求方式
    timeout 请求超时
    dataType 服务器返回格式
    data 发送请求数据
    beforeSend: function () {} 请求发起前调用
    success 成功响应后调用
    error 错误响应时调用
    complete 响应完成时调用（包括成功和失败）
jQuery Ajax介绍
    http://www.w3school.com.cn/jquery/jquery_ref_ajax.asp
接口化开发
请求地址即所谓的接口，通常我们所说的接口化开发，其实是指一个接口对应一个功能，并且严格约束了请求参数和响应结果的格式，这样前后端在开发过程中，可以减少不必要的讨论，从而并行开发，可以极大的提升开发效率，另外一个好处，当网站进行改版后，服务端接口只需要进行微调。


模板引擎
原理剖析
    其本质是利用正则表达式，替换模板当中预先定义好的标签。
    正则表达式exec用法
    http://www.w3school.com.cn/jsref/jsref_exec_regexp.asp

流行模板引擎
    BaiduTemplate：http://tangram.baidu.com/BaiduTemplate/
    ArtTemplate：https://github.com/aui/artTemplate
    velocity.js：https://github.com/shepherdwind/velocity.js/
    Handlebars：http://handlebarsjs.com/
    http://blog.jobbole.com/56689/
artTemplate
    1、引入template-native.js
    2、<% 与  %> 符号包裹起来的语句则为模板的逻辑表达式
    3、<%= content %>为输出表达式

同源&跨域
同源
    同源策略是浏览器的一种安全策略，所谓同源是指，域名，协议，端口完全相同。
跨域 不同源则跨域
例如http://www.example.com/

    http://api.example.com/detail.html	        不同源	域名不同
    https//www.example.com/detail.html	        不同源	协议不同
    http://www.example.com:8080/detail.html	    不同源	端口不同
    http://api.example.com:8080/detail.html	    不同源	域名、端口不同
    https://api.example.com/detail.html	        不同源	协议、域名不同
    https://www.example.com:8080/detail.html	不同源	端口、协议不同
    http://www.example.com/detail/index.html	同源	只是目录不同


跨域方案
    1、顶级域名相同的可以通过domain.name来解决，即同时设置 domain.name = 顶级域名（如example.com）
    2、document.domain + iframe
    3、window.name + iframe
    4、location.hash + iframe
    5、window.postMessage()
    参考资料
    http://rickgray.me/2015/09/03/solutions-to-cross-domain-in-browser.html
JSONP JSON with Padding
1、原理剖析
    其本质是利用了<script src=""></script>标签具有可跨域的特性，由服务端返回一个预先定义好的Javascript函数的调用，并且将服务器数据以该函数参数的形式传递过来，此方法需要前后端配合完成。
    只能以GET方式请求
jQuery中的JSONP
    jQuery 的$.ajax() 方法当中集成了JSONP的实现，可以非常方便的实现跨域数据的访问。
    dataType: 'jsonp' 设置dataType值为jsonp即开启跨域访问
    jsonp 可以指定服务端接收的参数的“key”值，默认为callback
    jsonpCallback 可以指定相应的回调函数，默认自动生成


/**
    * 连接符
    * Javascript中用+号表示连接符
    * PHP中使用.点号
    */
	$hello = 'hello';
	$world = 'world';

	echo $hello . $world;   helloworld

	// 输出的是详细信息
	var_dump($hello);       string 'hello' (length=5)


    $arr = array('name'=>'itcast'); 
	// 一般场景是用来设试代码使用
	var_dump($arr);  array   'name' => string 'itcast' (length=6)


/**
	 * 分支控制语句、循环语句
	 * 与Javascript一样
	 * foreach 数组遍历函数，类似Javascript中的 for in
	 */

	// var arr = [1, 2, 3, 4];
	// for(var i=0; i<arr.length; i++) {console.log(arr[i]);}

	// 索引数组
	// $arr = array(1, 2, 3, 4, 5, 6);

	// echo count($arr);
	// 需要获取数组长度，count($arr);
	// for($i=0; $i<count($arr); $i++) {
	// 	echo $arr[$i];
	// }

	// 关联数组
	// $arr = array('name'=>'itcast', 'age'=>10);

	// 用来遍历数组的
	// foreach($arr as $key=>$val) {
	// 	// echo $key;
	// 	echo $val;
	// }

	// var obj = {name: 'itcast', age: 10}
	// for(var key in obj) {console.log(obj[key])}

	// $arr = array(1, 2, 3, 4, 5, 6);

	// foreach($arr as $a=>$b) {
	// 	// echo $a;
	// 	echo $b;
	// }

	// 实际开发中用foreach来遍历数组

	// 单/双引号号
	$str = 'hello';

	// 双引号可以解析变量
	// echo "$str world";  hello world

	// 单引号不会解析变量，会当字符串处理
	echo '$str world';

	echo $str . 'world!';



 var xhr = new XMLHttpRequest;
// var xhr = new XMLHttpRequest;
xhr.open('get', '02.php?name=itcast&age=10');
// xhr.open('get','o2.php?name=itcast&age=10')
// 当post形式必须要写请求头Content-Type，并且只能是application/x-www-form-urlencoded

// 当以get形式情况下可以不写Content-Type
// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

// POST数据放到请求主体中，但是不是必须要填写的
xhr.send(null);

// 监听响应状态
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
    }
}


		var obj = '{"name": "itcast","age": 10}';
		// JSON是一个内建对象
		// 将字符串转成JS对象
		obj = JSON.parse(obj);   Object {name: "itcast", age: 10}

       var objs = {"name": "itcast","age": 10};
	   objs = JSON.stringify(obj);     "{"name":"itcast","age":10}"


 	// $obj = '{"name": "itcast", "age": 10}';
	// echo $obj;
	// 解码JSON
	// json_decode();
	// var_dump(json_decode($obj));
	// 编码JSON
	// json_endcode();


	// 指定文档类型
	// 可以不指定
	header('Content-Type:application/json; charset=utf-8');

	// 1、PHP连接数据库、读取数据
	// 2、一般情况下会将读取的数据转成数组
	// 3、需要通过json_encode() 来转成json
	// 4、可以将json数据echo，返回给js 或其它语言

	$result = file_get_contents('stars.json');

	echo $result;

封装自已的Ajax库
var $ = {
	params: function (params) {
		var data = '';
		// 拼凑参数
		for(key in params) {
			data += key + '=' + params[key] + '&';
		}

		// 将最后一个&字符截掉
		return data.slice(0, -1);
	},
	// Ajax实例
	ajax: function (options) {
		// 实例化XMLHttpRequest
		var xhr = new XMLHttpRequest,
			
			// 默认为get方式
			type = options.type || 'get',
			// 默认请求路径
			url = options.url || location.pathname,
			// 格式化数据key1=value1&key2=value2
			data = this.params(options.data),

			callback = options.success;

		// get 方式将参数拼接到URL上并将data设置成null
		if(type == 'get') {
			url = url + '?' + data;
			data = null;
		}

		xhr.open(type, url);

		// post 方式设置请求头
		if(type == 'post') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}

		// 发送请求主体
		xhr.send(data);

		// 监听响应
		xhr.onreadystatechange = function () {
			if(xhr.readyState == 4 && xhr.status == 200) {
				// 获取响应类型
				var contentType = xhr.getResponseHeader('Content-Type');

				var data = xhr.responseText;

				// 解析JSON
				if(contentType.indexOf('json') != -1) {
					data = JSON.parse(data);
				}
				
				// 调用success
				// options.success(data);
				
				callback(data);
			} else {
				options.error('请求失败!');
			}
		}

	}
};


box-sizing: border-box; 代表计算宽高的时候会把boder 加上等于你现在样式里面设计的width

<script src="./js/jquery.min.js"></script>
<script>

    var obj = {
        name: 'itcast',
        age: 10
    }

    var opt = {
        name: 'web',
        age: 15,
        sex: '男'
    }

    // 合并两个对象，后面的 有则替换 无则添加
    console.log($.extend(obj, opt));
</script>


简单插件开发：
<p>我是一个文字</p>

<script src="./js/jquery.min.js"></script>
<script>

    console.log($.fn);

    // $('p').addClass();

    $.fn.test = function () {
        console.log(this);
    }

    $('p').test();

    // 1、自已可以往$.fn上面添加一个自定义的方法
    // 2、当我们在这个方法引用this，this指向的是当前DOM对象
    // 3、调用的时候和普通的方法一样

    // 换颜色
    $.fn.setColor = function (color) {
        $(this).css('color', color);
    }

    $('p').click(function () {
        $(this).setColor('blue');
    });

</script>


封装的JQ插件：
;(function ($) {
	$.fn.waterFall = function (options) {

		// 默认值及参数
		var defalut = $.extend({
			gap: 20
		}, options);

		// 初始化
		var _this = $(this),
			items = _this.children(),
			width = items.width(),
			height = 0,
			// 计算可以放置几列
			count = Math.floor(_this.width() / (width + defalut.gap)),
			columns = [];

		items.each(function (key, val) {
			// 每个元素的高度
			height = $(val).height();

			// 第一行
			if(key < count) {
				// 每一列的高度
				columns[key] = height;

				// 设置定位坐标
				$(val).css({
					top: 0, 
					left: (width + defalut.gap) * key
				});
			} else {
				var min_h = columns[0];
				var min_k = 0;

				// 取出最小列及下标
				for(var i=0; i<columns.length; i++) {
					if(columns[i] < min_h) {
						min_h = columns[i];
						min_k = i;
					}
				}

				// 更新当前列的高度
				columns[min_k] += height;

				$(val).css({
					top: min_h + defalut.gap,
					left: (width + defalut.gap) * min_k
				});
			}
		});

		// 排序
		columns = columns.sort(function (a, b) {
			return b - a;
		});

		_this.css({
			height: columns[0]
		});

	}
})(jQuery);



Jsonp 跨域：
// jQuery中JSONP是通过$.ajax()，来实现的
$.ajax({
    url: 'http://api.study.com/jsonp.php',
    type: 'get',
    // 这里需要将dataType 指定为jsonp
    dataType: 'jsonp',
    data: {name: 'itcast'},
    // 以字符串形式将事先定义好的函数名传递进来
    // jsonpCallback: 'test',
    // jsonp: 'call',
    success: function (data) {
        // console.log(data);
    },
    error: function (err) {
        console.log(err);
    }
});


H5
    HTML5并不仅仅只是做为HTML标记语言的一个最新版本，更重要的是它制定了Web应用开发的一系列标准，成为第一个将Web做为应用开发平台的HTML语言。
    HTML5定义了一系列新元素，如新语义标签、智能表单、多媒体标签等，可以帮助开发者创建富互联网应用，还提供了一些Javascript API，如地理定位、重力感应、硬件访问等，
    可以在浏览器内实现类原生应用，甚至结合Canvas我们可开发网页版游戏。
语义标签
    语义标签对于我们并不陌生，如<p>表示一个段落、<ul>表示一个无序列表<h1> ~ <h6>表示一系列标题等，在此基础上HTML5增加了大量更有意义的语义标签，
    更有利于搜索引擎或辅助设备来理解HTML页面内容。
    传统的做法我们或许通过增加类名如class="header"、class="footer"，使HTML页面具有语义性，但是不具有通用性。
    HTML5则是通过新增语义标签的形式来解决这个问题，例如<header></header>、<footer></footer>等，这样就可以使其具有通用性。

常用新语义标签
    <nav> 表示导航
    <header> 表示页眉
    <footer> 表示页脚
    <section> 表示区块
    <article> 表示文章 如文章、评论、帖子、博客
    <aside> 表示侧边栏 如文章的侧栏
    <figure> 表示媒介内容分组 与 ul > li 做个比较
    <mark> 表示标记 (带用“UI”，不怎么用，可以重写样式)
    <progress> 表示进度 (带用“UI”，不怎么用，不可重写样式)
    <time> 表示日期
    <hgroup> 标题列表 (据说已废弃)
    <details>
    <bdi>
    <command>
    <summary>
    <rp>
    <rt>
    <ruby>
    本质上新语义标签与<div>、<span>没有区别，只是其具有表意性，使用时除了在HTML结构上需要注意外，其它和普通标签的使用无任何差别，可以理解成<div class="nav"> 
    相当于 <nav>。不要好奇，它只是一个标签！尽量避免全局使用header、footer、aside等语义标签。

兼容处理
    在不支持HTML5新标签的浏览器里，会将这些新的标签解析成行内元素(inline)对待，所以我们只需要将其转换成块元素(block)即可使用，但是在IE9版本以下，
    并不能正常解析这些新标签，但是却可以识别通过document.createElement('tagName')创建的自定义标签，于是我们的解决方案就是将HTML5的新标签
    全部通过document.createElement('tagName')来创建一遍，这样IE低版本也能正常解析HTML5新标签了，在实际开发中我们更多采用的是通过检测IE浏览器
    的版本来加载第三方的一个JS库来解决兼容问题。
    <!--[if lte IE 8]>
        <script src./js/html5shiv.min.js></script>
    <![endif]-->
表单
    伴随着互联网富应用以及移动开发的兴起，传统的Web表单已经越来越不能满足开发的需求，所以HTML5在Web表单方向也做了很大的改进，如拾色器、日期/时间组件等，使表单处理更加高效。    
    输入类型
        email 输入email格式
        tel 手机号码
        url 只能输入url格式
        number 只能输入数字
        search 搜索框
        range 范围
        color 拾色器
        time	时间
        date 日期 不是绝对的
        datetime 时间日期
        month 月份
        week 星期
        部分类型是针对移动设备生效的，且具有一定的兼容性，在实际应用当中可选择性的使用。
    表单元素（标签）
        <datalist> 下拉选项，使用中文时要注意
        <keygen> 生成加密字符串
        <output> 不可当做数据提交？
        <meter> 表示度量器，不建议用作进度条
    表单属性
        placeholder 占位符
        autofocus 获取焦点
        multiple 文件上传多选或多个邮箱地址
        autocomplete 自动完成，用于form元素，也可用于部分input，默认值on
        form 指定表单项属于哪个form，处理复杂表单时会需要
        novalidate 关闭验证，可用于<form>标签，（只适应用form）
        required 验证条件，必填项
        pattern 正则表达式 自定义验证规则
        表单重写没有提及，自行验证，共包含
        formaction、formenctype、formtarget、formmethod、formnovalidate
        应用于提交按钮上，如：<input type="submit" formaction="xxx.php">
    表单事件
        oninput 用户输入内容时触发，可用于移动端输入字数统计
        oninvalid 验证不通过时触发
多媒体
    在HTML5之前，在网页上播放音频/视频的通用方法是利用Flash来播放，但是大多情况下，并非所有用户的浏览器都安装了Flash插件，
    由此使得处理音频/视频播放变的非常复杂，并且移动设备的浏览器并不支持Flash插件。
    音频
        HTML5通过<audio>标签来解决音频播放的问题。
        使用相当简单，如下所示
        <!--通过src指定的音频文件路径即可-->
        <audio src="./music/see you again.mp3"></audio>
    并且可以通过附加属性可以更友好控制音频的播放，如：
    autoplay 自动播放
    controls 是否显不默认播放控件
    loop 循环播放
    preload 预加载 同时设置autoplay时些属性失效
    由于版权等原因，不同的浏览器可支持播放的格式是不一样的
                IE9  Firefox3.5  Opera10.5  Chorme3.0   Safari3.0
    Ogg Vorbis         Y           Y          Y
    mp3          Y                            Y            Y
    Wav                Y           Y                       Y
    多浏览器支持的方案，如下
    <audio src="" controls>
        <!--通过source标签指定多格式音频文件-->
        <source src="./music/See you again.mp3">
        <source src="./music/See you again.wav">
        <source src="./music/See you again.ogg">
        您的浏览器不支持HTML音频播放功能
    </audio>

视频
    HTML5通过<video>标签来解决音频播放的问题。
    同音频播放一样，<video>使用也相当简单，如下
    <!--通过src指定的音频文件路径即可-->
    <video src="./music/see you again.mp3"></video>
    同样，通过附加属性可以更友好的控制视频的播放
    autoplay 自动播放
    controls 是否显示默认播放控件
    loop 循环播放
    preload 预加载，同时设置了autoplay，此属性将失效
    width 设置播放窗口宽度
    height 设置播放窗口的高度
    由于版权等原因，不同的浏览器可支持播放的格式是不一样的 -- 见图片
    多浏览器支持的方案，如下
    <video controls="controls">
        <!--通过source标签指定多格式视频文件-->
        <source src="./video/movie.ogg">
        <source src="./video/movie.mp4">
        您的浏览器不支持HTML视频播放功能
    </audio>

微数据
    http://kayosite.com/html5-microdata.html
    可以理解成新语义标签的一种补充
ARIA
    http://www.zhangxinxu.com/wordpress/2012/03/wai-aria-%E6%97%A0%E9%9A%9C%E7%A2%8D%E9%98%85%E8%AF%BB/#ariaRole

DOM扩展
    获取元素
        1、document.getElementsByClassName ('class') 通过类名获取元素，以类数组形式存在。
        2、document.querySelector('selector') 通过CSS选择器获取元素，符合匹配条件的第1个元素。
        3、document.querySelectorAll('selector') 通过CSS选择器获取元素，以类数组形式存在。
	类名操作
        1、Node.classList.add('class') 添加class
        2、Node.classList.remove('class') 移除class
        3、Node.classList.toggle('class') 切换class，有则移除，无则添加
        4、Node.classList.contains('class') 检测是否存在class
        Node指一个有效的DOM节点，是一个通称。
	自定义属性
        在HTML5中我们可以自定义属性，其格式如下data-*=""，例如
        data-info="我是自定义属性"，通过Node.dataset['info'] 我们便可以获取到自定义的属性值。
        Node.dataset是以对象形式存在的
        当我们如下格式设置时，则需要以驼峰格式才能正确获取
        data-my-name="baidu"，获取Node.dataset['myName']


新增API

拖拽
    在HTML5的规范中，我们可以通过为元素增加draggable="true"来设置此元素是否可以进行拖拽操作，其中图片、链接默认是开启的。
    拖拽元素    
        页面中设置了draggable="true"属性的元素
    目标元素
        页面中任何一个元素都可以成为目标元素

    事件监听
        拖拽元素
        ondrag 		应用于拖拽元素，整个拖拽过程都会调用
        ondragstart	应用于拖拽元素，当拖拽开始时调用
        ondragleave	应用于拖拽元素，当鼠标离开拖拽元素时调用
        ondragend	应用于拖拽元素，当拖拽结束时调用
        目标元素
        ondragenter	应用于目标元素，当拖拽元素进入时调用
        ondragover	应用于目标元素，当停留在目标元素上时调用
        ondrop		应用于目标元素，当在目标元素上松开鼠标时调用
        ondragleave	应用于目标元素，当鼠标离开目标元素时调用
        数据传递
        ev.dataTransfer.setData() 设置数据
        ev.dataTransfer.getData() 读取数据
历史管理
    提供window.history，对象我们可以管理历史记录，可用于单页面应用，Single Page Application，可以无刷新改变网页内容。
    旧版本
        history.back() 回退
        history.forward() 前进
        history.go(n) 前进/后退n步，正值前进，负值后退
        history.length历史记录条数
    新增方法
        1、pushState(data, title, url) 追加一条历史记录
            data用于存储自定义数据，通常设为null
            title网页标题，基本上没有被支持，一般设为空
            url 以当前域为基础增加一条历史记录，不可跨域设置
        2、replaceState(data, title, url) 与pushState()基本相同，不同之处在于replaceState()，只是替换当前url，不会增加/减少历史记录。
        Single Page Application单页面应用
    事件监听
        onpopstate事件，当前进或后退时则触发，通过事件对象ev.state可以读取到存储的数据，监听是要给window。
地理定位
    在HTML规范中，增加了获取用户地理信息的API，这样使得我们可以基于用户位置开发互联网应用，即基于位置服务 (Location Base Service)
    获取地理信息方式
        1、IP地址
        2、三维坐标
            GPS（Global Positioning System，全球定位系统）
            Wi-Fi
            手机信号
        3、用户自定义数据
        如附图对不同获取方式的优缺点进行了比较，浏览器会自动以最优方式去获取用户地理信息。
    隐私
    HTML5 Geolocation 规范提供了一套保护用户隐私的机制。必须先得到用户明确许可，才能获取用户的位置信息。
    API详解
        navigator.getCurrentPosition(successCallback, errorCallback, options) 获取当前地理信息
        navigator.watchPosition(successCallback, errorCallback, options) 重复获取当前地理信息
        1、当成功获取地理信息后，会调用succssCallback，并返回一个包含位置信息的对象position。
            position.coords.latitude纬度
            position.coords.longitude经度
            position.coords.accuracy精度
            position.coords.altitude海拔高度
        2、当获取地理信息失败后，会调用errorCallback，并返回错误信息error
        3、可选参数 options 对象可以调整位置信息数据收集方式
            a) enableHighAccuracy 高精度模式
            b) timeout 超时设置，单位为ms
            c) maximumAge表示浏览器重新获取位置信息的时间间隔，单位为ms

Web存储
    随着互联网的快速发展，基于网页的应用越来越普遍，同时也变的越来越复杂，为了满足各种各样的需求，会经常性在本地存储大量的数据，传统方式我们以document.cookie来进行存储的，但是由于其存储大小只有4k左右，并且解析也相当的复杂，给开发带来诸多不便，HTML5规范则提出解决方案
	特性
        1、设置、读取方便
        2、容量较大，sessionStorage约5M、localStorage约20M
        4、只能存储字符串，可以将对象JSON.stringify() 编码后存储
    window.sessionStorage
        1、生命周期为关闭浏览器窗口
        2、在同一个窗口下数据可以共享
    window.localStorage
        1、永久生效，除非手动删除
        2、可以多窗口共享
    方法详解
        setItem(key, value) 设置存储内容
        getItem(key) 读取存储内容
        removeItem(key) 删除键值为key的存储内容
        clear() 清空所有存储内容
        key(n) 以索引值来获取存储内容
    其它
        WebSQL、IndexDB
全屏
    HTML5规范允许用户自定义网页上任一元素全屏显示。
        requestFullScreen() 开启全屏显示
        cancleFullScreen() 关闭全屏显示
    不同浏览器需要添加前缀如：
        webkitRequestFullScreen、mozRequestFullScreen
        webkitCancelFullScreen、mozCancelFullScreen
    规范允许所有元素可以取全屏，但实际测试结果关闭全屏只能添加到document元素上
    通过document.fullScreen检测当前是否处于全屏状态
    不同浏览器需要添加前缀
        document.webkitIsFullScreen、document.mozFullScreen
    全屏伪类
        :full-screen .box {}、:-webkit-full-screen {}、:moz-full-screen {}

网络状态
    我们可以通过window. navigator.onLine来检测，用户当前的网络状况，返回一个布尔值
    addEventListener 进行绑定online用户网络连接时被调用
    addEventListener 进行绑定.offline用户网络断开时被调用
    事件是给window绑订的

应用缓存
    HTML5中我们可以轻松的构建一个离线（无网络状态）应用，只需要创建一个cache manifest文件。
    优势
        1、可配置需要缓存的资源
        2、网络无连接应用仍可用
        3、本地读取缓存资源，提升访问速度，增强用户体验
        4、减少请求，缓解服务器负担
    缓存清单
        一个普通文本文件，其中列出了浏览器应缓存以供离线访问的资源，推荐使用.appcache为后缀名，添加MIME类型
        AddType text/cache-manifest .appcache
        例如我们创建了一个名为demo.appcache的文件，然后在需要应用缓存在页面的根元素(html)添加属性manifest="demo.appcache"，路径要保证正确。
    manifest文件格式
        1、顶行写CACHE MANIFEST
        2、CACHE: 换行 指定我们需要缓存的静态资源，如.css、image、js等
        3、NETWORK: 换行 指定需要在线访问的资源，可使用通配符
        4、FALLBACK: 换行 当被缓存的文件找不到时的备用资源
    事件监听
    其它
        1、CACHE: 可以省略，这种情况下将需要缓存的资源写在CACHE MANIFEST
        2、可以指定多个CACHE:  NETWORK:  FALLBACK:，无顺序限制
        3、#表示注释，只有当demo.appcache文件内容发生改变时或者手动清除缓存后，才会重新缓存。
        4、chrome 可以通过chrome://appcache-internals/工具和离线（offline）模式来调试管理应用缓存
文件读取
    通过FileReader对象我们可以读取本地存储的文件，可以使用 File 对象来指定所要读取的文件或数据。其中File对象可以是来自用户在一个 <input> 元素上选择文件后返回的FileList 对象，也可以来自由拖放操作生成的  DataTransfer
    FileList对象
        由于HTML5中我们可以通过为表单元素添加multiple属性，因此我们通过<input>上传文件后得到的是一个FileList对象（伪数组形式）。
    FileReader对象
    HTML5新增内建对象，可以读取本地文件内容。
    var reader = new FileReader; 可以实例化一个对象
    实例方法
        1、readAsDataURL() 以DataURL形式读取文件
    事件监听
        onload 当文读取完成时调用
    属性
        result 文件读取结果
    参考资料
    https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader#toc

多媒体
    方法：load()、play()、pause()
    属性：currentSrc、currentTime、duration
    事件：
    参考文档
    http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp


Css3:

    []		表示全部可选项
    ||		表示或者
    |		表示多选一
    ？	表示0个或者1个
    *		表示0个或者多个
    {}		表示范围

选择器：

属性选择器
    其特点是通过属性来选择元素，具体有以下5种形式：
    1、E[attr] 表示存在attr属性即可；
    2、E[attr=val] 表示属性值完全等于val；
    3、E[attr*=val] 表示的属性值里包含val字符并且在“任意”位置；
    4、E[attr^=val] 表示的属性值里包含val字符并且在“开始”位置；
    5、E[attr$=val] 表示的属性值里包含val字符并且在“结束”位置；
伪类选择器
    除了以前学过的:link、:active、:visited、:hover，CSS3又新增了其它的伪类选择器。
    1、以某元素相对于其父元素或兄弟元素的位置来获取无素的结构伪类。
        重点理解通过E来确定元素的父元素。
        E:first-child第一个子元素
        E:last-child最后一个子元素
        E:nth-child(n) 第n个子元素，计算方法是E元素的全部兄弟元素；
        E:nth-last-child(n) 同E:nth-child(n) 相似，只是倒着计算；
        n遵循线性变化，其取值0、1、2、3、4、... 但是当n<=0时，选取无效。
        n可是多种形式：nth-child(2n+0)、nth-child(2n+1)、nth-child(-1n+3)等；
        需要满足y=ax+b
        注：指E元素的父元素，并对应位置的子元素必须是E
        E:empty 选中没有任何子节点的E元素；（使用不是非常广泛）
    2、目标伪类
      E:target 结合锚点进行使用，处于当前锚点的元素会被选中；

伪元素选择器
    E::first-letter文本的第一个单词或字（如中文、日文、韩文等）；
    E::first-line 文本第一行；
    E::selection 可改变选中文本的样式；
    重点：E::before、E::after
        是一个行内元素，需要转换成块元素
        E:after、E:before 在旧版本里是伪元素，CSS3的规范里“:”用来表示伪类，“::”用来表示伪元素，但是在高版本浏览器下E:after、E:before会被自动识别为E::after、E::before，这样做的目的是用来做兼容处理。
        E:after、E:before后面的练习中会反复用到，目前只需要有个大致了解
        ":" 与 "::" 区别在于区分伪类和伪元素
    参考文档
        :before和::before的区别
        https://www.qianduan.net/before-and-before-the-difference-between/
颜色
    新增了RGBA、HSLA模式，其中的A 表示透明度通道，即可以设置颜色值的透明度，相较opacity，它们不具有继承性，即不会影响子元素的透明度。
    Red、Green、Blue、Alpha即RGBA
    Hue、Saturation、Lightness、Alpha即HSLA
    R、G、B 取值范围0~255
    H 色调 取值范围0~360，0/360表示红色、120表示绿色、240表示蓝色
    S 饱和度 取值范围0%~100%
    L 亮度 取值范围0%~100%
    A 透明度 取值范围0~1
    关于透明度：
        1、opacity只能针对整个盒子设置透明度，子盒子及内容会继承父盒子的透明度；
        2 、transparent 不可调节透明度，始终完全透明
        RGBA、HSLA可应用于所有使用颜色的地方。
文本
    text-shadow，可分别设置偏移量、模糊度、颜色（可设透明度）。
        1、水平偏移量 正值向右 负值向左；
        2、垂直偏移量 正值向下 负值向上；
        3、模糊度是不能为负值；
边框
    其中边框圆角、边框阴影属性，应用十分广泛，兼容性也相对较好，具有符合渐进增强原则的特征

边框圆角
border-radius
    圆角处理时，脑中要形成圆、圆心、横轴、纵轴的概念，正圆是椭圆的一种特殊情况  附图

边框阴影
    box-shadow
        1、水平偏移量 正值向右 负值向左；
        2、垂直偏移量 正值向下 负值向上；
        3、模糊度是不能为负值；
        4、inset可以设置内阴影；
        设置边框阴影不会改变盒子的大小，即不会影响其兄弟元素的布局。
        可以设置多重边框阴影，实现更好的效果，增强立体感。

边框图片
    border-image
    设置的图片将会被“切割”成九宫格形式，然后进行设置。
    1、round和repeat之间的区别
        round 会自动调整尺寸，完整显示边框图片。

盒模型
    CSS3中可以通过box-sizing 来指定盒模型，即可指定为content-box、border-box，这样我们计算盒子大小的方式就发生了改变。
    可以分成两种情况：
        1、box-sizing: border-box  计算方式为content = width – border - padding  变小了
        2、box-sizing: content-box  计算方式为content = width
    兼容性比较好


背景
    背景在CSS3中也得到很大程度的增强，比如背景图片尺寸、背景裁切区域、背景定位参照点、多重背景等。
    1、background-size设置背景图片的尺寸
        cover会自动调整缩放比例，保证图片始终填充满背景区域，如有溢出部分则会被隐藏。 完全的充满这一张
        contain会自动调整缩放比例，保证图片始终完整显示在背景区域。 也就是背景图片可能有多张而拼凑出来
        也可以使用长度单位或百分比 
    2、background-origin设置背景定位的原点
        border-box以边框做为参考原点；
        padding-box以内边距做为参考原点；
        content-box以内容区做为参考点；
    3、background-clip设置背景区域裁切
        border-box裁切边框以内为背景区域；
        padding-box裁切内边距以内为背景区域；
        content-box裁切内容区做为背景区域；
    4、以逗号分隔可以设置多背景，可用于自适应局
        背景图片尺寸在实际开发中应用十分广泛。
渐变
    渐变是CSS3当中比较丰富多彩的一个特性，通过渐变我们可以实现许多炫丽的效果，有效的减少图片的使用数量，并且具有很强的适应性和可扩展性。
    可分为线性渐变、径向渐变

线性渐变
    linear-gradient线性渐变指沿着某条直线朝一个方向产生渐变效果。
    从黄色渐变到绿色
        1、必要的元素：
        a、方向
        b、起始颜色
        c、终止色；
    关于方向附图
 
径向渐变
    radial-gradient径向渐变指从一个中心点开始沿着四周产生渐变效果
    
    1、必要的元素：
        a、辐射范围即圆半径 
        b、中心点 即圆的中心
        c、渐变起始色
        d、渐变终止色
    2、关于中心点：中心位置参照的是盒子的左上角
    3、关于辐射范围：其半径可以不等，即可以是椭圆

径向渐变
radial-gradient径向渐变指从一个中心点开始沿着四周产生渐变效果 
    1、必要的元素：
        a、辐射范围即圆半径 
        b、中心点 即圆的中心
        c、渐变起始色
        d、渐变终止色
    2、关于中心点：中心位置参照的是盒子的左上角
    3、关于辐射范围：其半径可以不等，即可以是椭圆

过渡
    过渡是CSS3中具有颠覆性的特征之一，可以实现元素不同状态间的平滑过渡（补间动画），经常用来制作动画效果。
    帧动画：通过一帧一帧的画面按照固定顺序和速度播放。如电影胶片
    补间动画：自动完成从起始状态到终止状态的的过渡。
    关于补间动画更多学习可查看http://mux.alimama.com/posts/1009
    特点：当前元素只要有“属性”发生变化时，可以平滑的进行过渡。
    transition-property设置过渡属性
    transition-duration设置过渡时间
    transition-timing-function设置过渡速度
    transition-delay设置过渡延时

2D转换
    转换是CSS3中具有颠覆性的特征之一，可以实现元素的位移、旋转、变形、缩放，甚至支持矩阵方式，配合即将学习的过渡和动画知识，可以取代大量之前只能靠Flash才可以实现的效果。
        1、移动 translate(x, y) 可以改变元素的位置，x、y可为负值；
        2、缩放 scale(x, y) 可以对元素进行水平和垂直方向的缩放，x、y的取值可为小数，不可为负值；
        4、旋转 rotate(deg) 可以对元素进行旋转，正值为顺时针，负值为逆时针；
        5、倾斜 skew(deg, deg) 可以使元素按一定的角度进行倾斜
3D转换
    1、3D坐标轴
        用X、Y、Z分别表示空间的3个维度，三条轴互相垂直
    2、左手坐标系
        伸出左手，让拇指和食指成“L”形，大拇指向右，食指向上，中指指向前方。这样我们就建立了一个左手坐标系，拇指、食指和中指分别代表X、Y、Z轴的正方向
    3、左手法则
        左手握住旋转轴，竖起拇指指向旋转轴正方向，正向就是其余手指卷曲的方向。

动画
    动画是CSS3中具有颠覆性的特征之一，可通过设置多个节点来精确控制一个或一组动画，常用来实现复杂的动画效果。
    1、必要元素：
        a、通过@keyframes指定动画序列；
        b、通过百分比将动画序列分割成多个节点；
        c、在各节点中分别定义各属性
        d、通过animation将动画应用于相应元素；
    2、关键属性
        a、animation-name设置动画序列名称
        b、animation-duration动画持续时间
        c、animation-delay动画延时时间
        d、animation-timing-function动画执行速度，linear、ease等
        e、animation-play-state动画播放状态，play、paused等
        f、animation-direction动画逆播，alternate等
        g、animation-fill-mode动画执行完毕后状态，forwards、backwards等
        h、animation-iteration-count动画执行次数，inifinate等


伸缩布局 附图
    CSS3在布局方面做了非常大的改进，使得我们对块级元素的布局排列变得十分灵活，适应性非常强，其强大的伸缩性，在响应式开中可以发挥极大的作用。
    主轴：Flex容器的主轴主要用来配置Flex项目，默认是水平方向
    侧轴：与主轴垂直的轴称作侧轴，默认是垂直方向的
    方向：默认主轴从左向右，侧轴默认从上到下
    主轴和侧轴并不是固定不变的，通过flex-direction可以互换。

    1、必要元素：
        a、指定一个盒子为伸缩盒子 display: flex
        b、设置属性来调整此盒的子元素的布局方式 例如 flex-direction
        c、明确主侧轴及方向
        d、可互换主侧轴，也可改变方向
    2、各属性详解
        a、flex-direction调整主轴方向（默认为水平方向）
        b、justify-content调整主轴对齐
        c、align-items调整侧轴对齐
        d、flex-wrap控制是否换行
        e、align-content堆栈（由flex-wrap产生的独立行）对齐
        f、flex-flow是flex-direction、flex-wrap的简写形式
        g、flex控制子项目的缩放比例
        h、order控制子项目的排列顺序

字体格式
不同浏览器所支持的字体格式是不一样的，我们有必要了解一下有关字体格式的知识。
    1、TureTpe(.ttf)格式
        .ttf字体是Windows和Mac的最常见的字体，是一种RAW格式，支持这种字体的浏览器有IE9+、Firefox3.5+、Chrome4+、Safari3+、Opera10+、iOS Mobile、Safari4.2+；
    2、OpenType(.otf)格式
        .otf字体被认为是一种原始的字体格式，其内置在TureType的基础上，支持这种字体的浏览器有Firefox3.5+、Chrome4.0+、Safari3.1+、Opera10.0+、iOS Mobile、Safari4.2+；
    3、Web Open Font Format(.woff)格式
        woff字体是Web字体中最佳格式，他是一个开放的TrueType/OpenType的压缩版本，同时也支持元数据包的分离，支持这种字体的浏览器有IE9+、Firefox3.5+、Chrome6+、Safari3.6+、Opera11.1+；
    4、Embedded Open Type(.eot)格式
        .eot字体是IE专用字体，可以从TrueType创建此格式字体，支持这种字体的浏览器有IE4+；
    5、SVG(.svg)格式
        .svg字体是基于SVG字体渲染的一种格式，支持这种字体的浏览器有Chrome4+、Safari3.1+、Opera10.0+、iOS Mobile Safari3.2+；
    了解了上面的知识后，我们就需要为不同的浏览器准备不同格式的字体，通常我们会通过字体生成工具帮我们生成各种格式的字体，因此无需过于在意字体格式间的区别差异。
    推荐http://www.zhaozi.cn/、http://www.youziku.com/ 查找更多中文字体


字体图标
    其实我们可以把文字理解成是一种特殊形状的图片，反之我们是不是也可以把图片制作成字体呢？
    答案是肯定的。
    常见的是把网页常用的一些小的图标，借助工具帮我们生成一个字体包，然后就可以像使用文字一样使用图标了。
    优点：
        1、将所有图标打包成字体库，减少请求；
        2、具有矢量性，可保证清晰度；
        3、使用灵活，便于维护；
    Font Awesome 使用介绍
        http://fontawesome.dashgame.com/
    定制自已的字体图标库
        http://iconfont.cn/
        https://icomoon.io/
    SVG素材
        http://www.iconsvg.com/


通过http://caniuse.com/ 可查询CSS3各特性的支持程度，一般兼容性处理的常见方法是为属性
添加私有前缀，如不能解决，应避免使用，无需刻意去处理CSS3的兼容性问题。


私有前缀：
    /*-webkit- 内核的浏览器会识别*/
    -webkit-border-radius: 100px;
    /*火狐浏览器 当属稳定后会将带前缀的属性废弃*/
    -moz-border-radius: 100px;
    border-radius: 100px;
    /*欧朋*/
    /*-o-*/
    /*IE*/
    /*-ms-*/

锚点：
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>CSS3 动画</title>
    <style>
        html,
        body {
            height: 100%;
            overflow: hidden;
        }
        
        body {
            margin: 0;
            padding: 0;
            position: relative;
        }
        
        ul.handle {
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            position: relative;
        }
        
        .handle li {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        
        .handle li:nth-child(1) {
            background: url(./images/bg1.jpg);
            background-size: cover;
            z-index: 3;
        }
        
        .handle li:nth-child(2) {
            background: url(./images/bg2.jpg);
            background-size: cover;
            z-index: 2;
        }
        
        .handle li:nth-child(3) {
            background: url(./images/bg3.jpg);
            background-size: cover;
            z-index: 1;
        }
        
        .btn {
            width: 100%;
            height: 120px;
            text-align: center;
            position: absolute;
            bottom: 80px;
            z-index: 10;
        }
        
        .btn li {
            display: inline-block;
            width: 120px;
            height: 120px;
            text-align: center;
            line-height: 120px;
            font-size: 30px;
            border-radius: 50%;
            background: pink;
            margin: 0 10px;
        }
        
        .btn a {
            display: inline-block;
            width: 100%;
            height: 100%;
            text-decoration: none;
            color: #000;
        }
        /*表明第一个锚点被选中*/
        
        #img1:target {
            z-index: 3;
            /*可以定义一个动画*/
            animation: slideleft 1s;
        }
        /*表明第二个锚点被选中*/
        
        #img2:target {
            z-index: 3;
        }
        /*表明第三个锚点被选中*/
        
        #img3:target {
            z-index: 3;
        }
        
        @keyframes slideleft {
            from {
                transform: translateX(-100%);
            }
            to {
                transform: translateX(0);
            }
        }
    </style>
</head>

<body>
    <ul class="handle">
        <li id="img1"></li>
        <li id="img2"></li>
        <li id="img3"></li>
    </ul>

    <ul class="btn">
        <li>
            <a href="#img1">1</a>
        </li>
        <li>
            <a href="#img2">2</a>
        </li>
        <li>
            <a href="#img3">3</a>
        </li>
    </ul>
</body>

</html>



1、边框阴影、边框图片
    这个图片想要应用到这个盒子上面， 需要对图片
进行裁切，裁成9块，对应的我的盒子也是有9块区域，
尺寸也有一定的规则
显示区域占不满会拉伸或者平铺 
round / repeat
可以设置裁好的图片的宽度和高度


2、背景 背景尺寸 cover cotain 多重背景
	背景尺寸 设置背景的宽和高 
	设置的值和我元素的宽高比不一致的时候  可能产生拉伸或者压缩
	cover  : 自动调整宽高比 使得自动填充满我们的盒子
	contain: 自动调整宽高比 使得图片完整显示在盒子里面

	背景原点： 调整背景图片定位的参考原点的位置  content-box  padding-box border-box
	背景裁切： 背景区域 

	多重背景：可以做一个自适应


3、渐变 线性渐变 径向渐变
	
	线性渐变： 方向 起始颜色 终止颜色 渐变范围
方向--- 角度---- 顺时针	
	径向渐变： 圆  圆心点  半径 圆心是参照盒子左上角走的


4、过渡，从一个到另一个状态，transition，可实现平滑的过渡

5、移动、缩放、旋转、倾斜、矩阵，transform: transform-origin:


6、http://isux.tencent.com/css3/   学习站点

align-content --代表的是在分行以后 对应的每一行的对齐方式
每一行当做一个独立的整体来看待 所以他的前提是需要有换行
调整行与行之间的对齐  所以应该看得是垂直的方向
我们把一行看看成一个整体   默认就是拉伸的属性

percpective   : 透视 作用是用来把一个平面的东西看起来有一种立体的效果
但是他本质上还是一个平面 
perserved-3d  : 应用场景 外面一个父盒子  父盒子里面有几个子盒子
比如说我们的百度钱包 一前一后 这个时候想让外面的父盒子成为一个立体的东西
而不是一个平面的东西 这个时候就需要加这个属性 加到这个父盒子上面
不加的话还是一个平面 不加这个 如果加perspective的话，看上去是一个3d的效果
本身还不是一个3d的东西 设置给了父盒子 起作用的是子盒子
子盒子又必须具备一个条件 就是子盒子也需要是应用了3d转换的元素 起作用的只有那个
起作用的子盒子









