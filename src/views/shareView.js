LostAndFound.Views.ShareView = (function () {
    var that = {},

        init = function(context) {
            $(".facebook-button").on('click', function() {
                onShareClick('facebook');
            });
            $(".twitter-button").on('click', function () {
                onShareClick('twitter');
            });
            return that;
        },

        onShareClick = function(service) {
            $(that).trigger('share', service);
        };

       
    that.init = init;
    return that;
}());