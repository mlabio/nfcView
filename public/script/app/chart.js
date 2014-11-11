    var chart = (function () {

        //variables
        var myVar,

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
          update: update  
        };

    }());

$( document ).ready(function() {
    chart.update();
});
