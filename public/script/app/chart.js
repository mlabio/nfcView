    var chart = (function () {

        //variables
        var myVar,
            init = function(){
                  var socket = io.connect('http://localhost');
                  socket.on('news', function (data) {
                    console.log(data);
                    socket.emit('my other event', { my: 'data' });
                  });
            },
            update = function (key, val) {

                
                console.log('updating');
                $("#bars li .bar").each(function (key, bar) {
                    var percentage = $(this).data('percentage');

                    $(this).animate({
                        'height': percentage + '%'
                    }, 1000);
                });
                return 'updated chart';
            };
        return{
          update: update,
        init: init
        };

    }());

$( document ).ready(function() {
    chart.update();
});
