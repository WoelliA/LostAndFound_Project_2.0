LostAndFound.Views.LoadingView = (function () {
    var that = {},
        spinner,
        target,

        init = function() {
            console.log("LoginView init");
            if (!spinner) {
                initSpinner();
            }

            return that;
        },
        initSpinner = function() {
            var opts = {
                lines: 13, // The number of lines to draw
                length: 20, // The length of each line
                width: 10, // The line thickness
                radius: 30, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#000', // #rgb or #rrggbb or array of colors
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                top: '50%', // Top position relative to parent
                left: '50%' // Left position relative to parent
            };
            target = document.getElementById('spinner');
            spinner = new Spinner(opts);
        };


    that.show = function () {
        $(target).removeClass('hidden');
        spinner.spin(target);
    };
    that.hide = function() {
        $(target).addClass('hidden');
        spinner.stop();
    };
    that.init = init;
    return that;
}());