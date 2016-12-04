$.ajax({
    url: 'reginon.php',
    type: 'get',
    data: { type: 'p', pid: '000000' },
    success: function(info) {
        var data = {
            opt: info
        }
        var html = template('tpl', data);
        $("#province").append(html);
    }
})

$("#province").on('change', function() {
    var pid = $(this).val();
    $(this).nextAll().empty();
    $.ajax({
        url: 'reginon.php',
        type: 'get',
        data: { type: 'c', pid: pid },
        success: function(info) {
            var data = {
                opt: info
            }
            var html = template('tpl', data);
            $("#city").append(html);
        }
    })
})
$("#city").on('change', function() {
    var pid = $(this).val();
    $(this).nextAll().empty();
    $.ajax({
        url: 'reginon.php',
        type: 'get',
        data: { type: 'd', pid: pid },
        success: function(info) {
            var data = {
                opt: info
            }
            var html = template('tpl', data);
            $("#district").append(html);
        }
    })
})