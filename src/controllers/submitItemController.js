
LostAndFound.Controllers.SubmitItemController = (function () {
    var that = {},
        submitView,

        init = function () {
            console.log("maincontroller init", LostAndFound.Views);
            submitView = LostAndFound.Views.SubmitItemView.init();
            attachListeners();

            return that;
        },

        attachListeners = function () {
        };

    that.init = init;
    return that;
}());
