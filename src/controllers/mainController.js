
LostAndFound.Controllers.MainController = (function () {
    var that = {},
        listView,
        mapView,
        model,
        settleTimeoutId,
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
            $(mapView).on("report-selected", onReportSelected);
            $(listView).on("report-selected", onReportSelected);
        },

        onReportSelected = function(evt, reportId) {
            console.log(reportId);
        },

        onSectorChanged = function (evt, sector) {
            if (settleTimeoutId) {
                clearTimeout(settleTimeoutId);
                settleTimeoutId = null;
            }

            settleTimeoutId = setTimeout(function() {
                var request = new LostAndFound.Model.ReportsRequest(sector);
                console.log(request);
                model.getReports(request, function (newResults, removedResults) {
                    settleTimeoutId = null;
                    for (var key in resultViews) {
                        resultViews[key].displayReports(newResults);
                        resultViews[key].removeReports(removedResults);
                    }
                });
            }, 500);
        };

    that.init = init;
    return that;
}());
