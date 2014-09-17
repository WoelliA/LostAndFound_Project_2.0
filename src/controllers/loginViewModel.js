var ViewModels;
(function (ViewModels) {
    var LoginViewModel = (function () {
        function LoginViewModel() {
            var _this = this;
            this.title = ko.observable();
            this.title("Login-View");
            setTimeout(function () {
                return _this.title("Timeout Title");
            }, 2000);
        }
        LoginViewModel.prototype.init = function (parameters) {
        };
        return LoginViewModel;
    })();
    ViewModels.LoginViewModel = LoginViewModel;
})(ViewModels || (ViewModels = {}));
//# sourceMappingURL=loginViewModel.js.map
