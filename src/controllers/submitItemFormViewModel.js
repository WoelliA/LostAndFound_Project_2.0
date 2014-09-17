var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../model/models.ts" />
/// <reference path="../model/lafmodel.ts" />
/// <reference path="../lostandfoundapp.ts" />
var ViewModels;
(function (ViewModels) {
    var SubmitItemFormViewModel = (function (_super) {
        __extends(SubmitItemFormViewModel, _super);
        function SubmitItemFormViewModel() {
            _super.apply(this, arguments);
            this.title = ko.observable();
            this.categories = ko.observableArray();
            this.selectedCategory = ko.observable();
            this.selectedCategorySubcategory = ko.observable();
            this.type = ko.observable();
            this.isloading = ko.observable();
        }
        SubmitItemFormViewModel.prototype.init = function (parameters) {
            var _this = this;
            _super.prototype.init.call(this, "Submit");
            Service.getCategories(function (cats) {
                cats.forEach(function (c) {
                    return _this.categories.push(c);
                });
            });
        };

        SubmitItemFormViewModel.prototype.submit = function () {
            var _this = this;
            this.isloading(true);
            Service.createItem({}, function () {
                _this.isloading(false);
                console.log("sdfdsfsdfd");
            });
            console.log(this.selectedCategory());
            console.log(this.selectedCategorySubcategory());
        };
        return SubmitItemFormViewModel;
    })(ViewModels.ViewModelBase);
    ViewModels.SubmitItemFormViewModel = SubmitItemFormViewModel;
})(ViewModels || (ViewModels = {}));
//# sourceMappingURL=submitItemFormViewModel.js.map
