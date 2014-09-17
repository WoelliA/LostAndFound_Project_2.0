var ViewModels;
(function (ViewModels) {
    var ListViewModel = (function () {
        function ListViewModel() {
            this.reports = ko.observableArray();
            this.title = ko.observableArray();
        }
        ListViewModel.prototype.init = function (parameters) {
            setTimeout(function () {
                ViewModels.MapViewModel.current.zoomChanged.add(function (args) {
                    return console.log("zoom changed");
                });
            }, 500);
            for (var i = 0; i < 10; i++) {
                this.reports.push(new Report("Reports" + i, "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.", "http://johanneshampel.online.de/wp-content/uploads/2008/01/fahrrad-juli-2006-014.jpg"));
            }
        };
        return ListViewModel;
    })();
    ViewModels.ListViewModel = ListViewModel;

    var Report = (function () {
        function Report(title, description, imageURL) {
            this.title = title;
            this.description = description;
            this.imageURL = imageURL;
        }
        return Report;
    })();
    ViewModels.Report = Report;
})(ViewModels || (ViewModels = {}));
//# sourceMappingURL=listViewModel.js.map
