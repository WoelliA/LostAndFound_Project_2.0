var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ViewModels;
(function (ViewModels) {
    var MainViewModel = (function (_super) {
        __extends(MainViewModel, _super);
        function MainViewModel() {
            _super.apply(this, arguments);
        }
        MainViewModel.prototype.init = function (parameters) {
            _super.prototype.init.call(this, "main");
        };
        return MainViewModel;
    })(ViewModels.ViewModelBase);
    ViewModels.MainViewModel = MainViewModel;
})(ViewModels || (ViewModels = {}));
//# sourceMappingURL=mainViewModel.js.map
