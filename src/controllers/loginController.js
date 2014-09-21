
LostAndFound.Controllers.LoginController = (function () {
    var that = {},
        submitView,

        init = function () {
            console.log("LoginController init", LostAndFound.Views);
            submitView = LostAndFound.Views.LoginView.init();
            attachListeners();

            return that;
        },

        attachListeners = function () {
        };

    that.init = init;
    return that;
}());
