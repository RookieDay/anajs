function getData(page) {
    $.ajax({
        url: './data.php',
        type: 'post',
        data: { page: page },
        beforeSend: function() {
            $('p.tips').text('正在加载..').addClass('loading');
        },
        success: function(info) {
            console.log(info);
            var html = teplate('tpl', info);
            $('.items').append(html).waterFall();
            $('p.tips').attr('data-page', info.page);
        },
        complete: function() {
            $('t.tips').text('继续加载').removeClass('loading');
        }
    });
}

getData(1);
$('p.tips').on('click', function() {
    var page = $(this).attr('data-page');
    if ($(this).hasClass('loading')) return;
    getData(page);
})

$(window).on('scroll', function() {
    var offsetTop = $('.items').offset().top;
    var height = $('.items').height();
    var scrollTop = $(this).scrollTop();
    var winHeight = $(this).height();

    var offset = offsetTop + height - scrollTop - winHeight;
    if (offset <= 200 && !$('p.tips').is('.loading')) {
        var page = $('p.tips').attr('data-page');
        getData(page);
    }
    xxssx
});