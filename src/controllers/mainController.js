
LostAndFound.Controllers.MainController = (function () {
    var that = {},
        listView,
        mapView,
        model,

        resultViews = [],

        init = function (args) {
            model = args.ReportsModel.init();

            console.log("maincontroller init", LostAndFound.Views, args);
            var views = LostAndFound.Views;

            var point = args.GeoModel.getDefaultLocation();
            listView = views.ListView.init(document);
            mapView = views.MapView.init(document, point);

            resultViews.push(listView);
            resultViews.push(mapView);

            args.GeoModel.getCurrentLocation(function (p) {
                mapView.setCenter(p);
            });


            attachListeners();
            return that;
        },

        attachListeners = function () {
            $(mapView).on("sector_changed", onSectorChanged);
        },

        onSectorChanged = function (evt, sector) {
            var request = new LostAndFound.Model.ReportsRequest(sector);
            console.log(request);
            model.getReports(request, function (newResults, removedResults) {
                for (var key in resultViews) {
                    resultViews[key].displayReports(newResults);
                    resultViews[key].removeReports(removedResults);
                }
            });
        };

    that.init = init;
    return that;
}());
