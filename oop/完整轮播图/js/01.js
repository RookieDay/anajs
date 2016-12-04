window.onload = function() {

    var box = document.getElementById("box");
    var arr = document.getElementById("arr");
    var arrRight = document.getElementById("right");
    var arrLeft = document.getElementById("left");
    var screen = box.children[0];
    var ul = screen.children[0];
    var ol = screen.children[1];
    var ulLis = ul.children;
    var imgWidth = screen.offsetWidth;
    var timer = null;
    var pic = 0;
    var square = 0;

    for (var i = 0; i < ulLis.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = i + 1;
        ol.appendChild(li);
    }
    var olLis = ol.children;
    olLis[0].className = 'current';

    var firstImg = ulLis[0].cloneNode(true);
    ul.appendChild(firstImg);

    for (var j = 0; j < olLis.length; j++) {
        olLis[j].index = j;
        olLis[j].onmouseover = function() {
            for (var k = 0; k < olLis.length; k++) {
                olLis[k].className = "";
            }
            this.className = "current";
        }
        var target = -this.index * imgWidth;
        animate(ul, target);
        pic = square = this.index;
    }
    box.onmouseover = function() {
        arr.style.display = "block";
        clearInterval(timer);
    }
    box.onmouseout = function() {
        arr.style.display = "none";
        timer = setInterval(playNext, 1000);
    }

    arrRight.onclick = function() {
        playNext();
    }
    arrLeft.onclick = function() {
        if (pic == 0) {
            ul.style.left = -imgWidth * (ulLis.length - 1) + 'px'
            pic = ulLis.length - 1;
        }
        pic--;
        var target = -pic * imgWidth;
        animate(ul, target);
        if (square > 0) {
            square--;
        } else {
            square = olLis.length - 1;
        }
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        olLis[square].className = "current";
    }

    function playNext() {
        if (pic == ulLis.length - 1) {
            ul.style.left = 0;
            pic = 0;
        }
        pic++;
        var target = -pic * imgWidth;
        animate(ul, target);
        if (square < olLis.length - 1) {
            square++;
        } else {
            square = 0;
        }
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        olLis[square].className = "current";
    }

    function animate(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var leader = obj.offsetLeft;
            var step = 20;
            step = leader < target ? step : -step;
            if (Math.abs(leader - target) > Math.abs(step)) {
                obj.style.left = leader + step + 'px';
            } else {
                clearInterval(obj.timer);
                obj.style.left = target + "px";
            }
        }, 25)
    }
}