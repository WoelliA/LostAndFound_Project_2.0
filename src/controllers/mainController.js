
LostAndFound.Controllers.MainController = (function () {
    var that = {},
        listView,
        mapView,
        model,
        settleTimeoutId,
        resultViews = [],
        controlsView,
        paginationView,
        lastresults,
        geoModel,

        init = function (args) {
            model = args.ReportsModel.init();
            lastresults = null;

            var views = LostAndFound.Views;

            controlsView = views.ControlsView.init(args.frame);
            paginationView = views.PaginationView.init(args.frame);
            geoModel = args.GeoModel.init();
            var point = geoModel.getDefaultLocation();
            console.log("starting point", point);
            listView = views.ListView.init(document);
            mapView = views.MapView.init(args.frame, point);

            resultViews.push(listView);
            resultViews.push(mapView);

            geoModel.getCurrentLocation(function (p) {
                mapView.setCenter(p);
            });

            args.ConfigModel.init().getItemTypes(function (types) {
                controlsView.displayItemTypes(types);
                if (localStorage["selected-categories-ids"]) {
                    controlsView.setSelectedItemTypes(localStorage["selected-categories-ids"]);
                }
                kickOffReset();
                attachListeners();
            });
            return that;
        },

        attachListeners = function () {
            $(mapView).on("sector_changed", function () {
                var settings = mapView.getMapSettings();
                geoModel.saveGeoSettings(settings);
                kickOffReset();
            });
            $(mapView).on("report-selected", onReportSelected);
            $(listView).on("report-selected", onReportSelected);
            $(controlsView).on("type-changed", function () {
                resultViews.forEach(function (view) {
                    if (view.clear)
                        view.clear();
                });
                reset();
            });
            $(controlsView).on("item-types-changed", function () {
                var selectedCategories = controlsView.getSelectedItemTypes();
                localStorage["selected-categories-ids"] = selectedCategories;
                kickOffReset();
            });
            $(paginationView).on("page-changed", reset);
        },

        onReportSelected = function (evt, reportId) {
            History.pushState(null, null, "/report/" + reportId);
        },

        kickOffReset = function () {
            if (settleTimeoutId) {
                clearTimeout(settleTimeoutId);
                settleTimeoutId = null;
            }
            settleTimeoutId = setTimeout(function () {
                reset();
            }, 500);
        },

        getResults = function () {
            var sector = mapView.getSector();
            var type = controlsView.getSelectedType();
            var itemTypes = controlsView.getSelectedItemTypes();
            var pageSize = paginationView.getPageSize();
            var page = paginationView.getPage();
            var offset = pageSize * (page - 1);
            var request = new LostAndFound.Model.ReportsRequest(sector, type, itemTypes, offset, pageSize);

            model.getReports(request, function (newResults) {
                settleTimeoutId = null;
                var trulyNewResults = newResults;
                if (lastresults) {
                    trulyNewResults = processResults(newResults, lastresults);
                }
                for (var key in resultViews) {
                    resultViews[key].removeReports(lastresults);
                    resultViews[key].displayReports(trulyNewResults);
                }
                lastresults = newResults;
            });
            return request;
        },

        processResults = function (newResults) {
            var trulyNewResults = [];
            for (var ni in newResults) {
                var report = newResults[ni];
                report.position = ni;
                var found = false;
                for (var oi in lastresults) {
                    var oldReport = lastresults[oi];
                    if (oldReport.id == report.id) {
                        lastresults.splice(oi, 1);

                        found = true;
                        break;
                    }
                }
                if (!found) {
                    trulyNewResults.push(report);
                }
            }
            return trulyNewResults;
        },

        reset = function () {
            var request = getResults();
            model.getReportsCount(request, {
                success: function (count) {
                    paginationView.setupPagination(count);
                }
            });
        };

    that.init = init;
    return that;
}());
