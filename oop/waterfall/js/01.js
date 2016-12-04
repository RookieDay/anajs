;
(function($) {
    $.fn.waterFall = function(options) {
        var defaultOption = $.extend({
            gap: 20
        }, options);
        var _this = $(this),
            items = _this.children(),
            width = items.width(),
            height = 0,
            count = Math.floor(_this.width() / (width + defaultOption.gap)),
            columns = [];
        items.each(function(key, val) {
            height = $(val).height();
            if (key < count) {
                columns[key] = height;
                $(val).css({
                    top: 0,
                    left: (width + defaultOption.gap) * key
                })
            } else {
                var min_h = column[0];
                var min_k = 0;
                for (var i = 0; i < columns.length; i++) {
                    if (columns[i] < min_h) {
                        min_h = columns[i];
                        min_k = i;
                    }
                }
                columns[min_k] += height;
                $(val).css({
                    top: min_h + defaultOption.gap,
                    left: (width + defaultOption.gap) * min_k
                })
            }
        })
        columns = columns.sort(function(a, b) {
            return b - a;
        })
        _this.css({
            height: column[0]
        })

    }

    // loading
    function getData(page) {
        $.ajax({
            url: './data.php',
            type: 'post',
            data: { page, page },
            beforeSend: function() {
                $('p.tips').text('正在加载..').addClass('loading');
            },
            success: function(info) {
                var html = template('tpl', info);
                $(".items").append(html).waterFall();
                $('p.tips').attr('data-page', info.page);
            },
            complete: function() {
                $('t.tips').text('继续加载').removeClass('loading');
            }
        })
    }
    getData(1);
    $("p.tips").on('click', function() {
        var page = $(this).attr('data-page');
        if (($this).hasClass('loading')) return;
        getData(page);
    })
    $(window).on('scroll', function() {
        var offsetTop = $(".ietms").offset().top;
        var height = $('.items').height();
        var scrollTop = $(this).scrollTop();
        var winHeight = $(this).height();
        var offset = offsetTop + height - scrollTop - winHeight;
        if (offset <= 200 & !$("p.tips").is('.loading')) {
            var page = $('p.tips').attr('data-page');
            getData(page);
        }
    })
})(jQuery);