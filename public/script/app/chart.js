    var chart = (function () {

        //variables
        var myVar,
            init = function (key, val) {

                console.log('chart init');
                $("#bars li .bar").each(function (key, bar) {
                    //console.log('key: ' + key + '  bar: ' + bar);
                    var percentage = $(this).data('percentage');

                    $(this).animate({
                        'height': percentage + '%'
                    }, 1000);
                });
                return 'chart init';
            },
            update = function (data) {
                console.log('chart update');
                $("#bars li .bar").each(function (key, bar) {
                    $(this).attr('data-percentage', data[key]);
                    var percentage = data[key];
                    
                    $(this).animate({
                        'height': percentage + '%'
                    }, 1000);
                    
                }
                );
                console.log('chart complete');
            };
        return {
            init: init,
            update: update
        };

    }());

    $(document).ready(function () {
        chart.init();
    });