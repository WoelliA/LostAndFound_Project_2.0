
LostAndFound.Controllers.MainController = (function () {
    var that = {},
        listView,
        mapView,
        model,
        settleTimeoutId,
        resultViews = [],
        controlsView,
        paginationView,

        init = function(args) {
            model = args.ReportsModel.init();

            console.log("maincontroller init", LostAndFound.Views, args);
            var views = LostAndFound.Views;

            controlsView = views.ControlsView.init(args.frame);
            paginationView = views.PaginationView.init(args.frame);
            var point = args.GeoModel.getDefaultLocation();
            listView = views.ListView.init(document);
            mapView = views.MapView.init(args.frame, point);

            resultViews.push(listView);
            resultViews.push(mapView);

            args.GeoModel.getCurrentLocation(function(p) {
                mapView.setCenter(p);
            });

            args.ConfigModel.init().getItemTypes(function(types) {
                controlsView.displayItemTypes(types);
            });

            attachListeners();
            return that;
        },

        attachListeners = function() {
            $(mapView).on("sector_changed", kickOffReset);
            $(mapView).on("report-selected", onReportSelected);
            $(listView).on("report-selected", onReportSelected);
            $(controlsView).on("type-changed", reset);
            $(controlsView).on("item-types-changed", kickOffReset);
            $(paginationView).on("page-changed", reset);
        },

        onReportSelected = function(evt, reportId) {
            //window.location.hash = "#/report/" + reportId;
            History.pushState(null, null, "/report/" + reportId);
            console.log(reportId);
        },

        kickOffReset = function() {
            console.log("kickoff");
            if (settleTimeoutId) {
                clearTimeout(settleTimeoutId);
                settleTimeoutId = null;
            }
            settleTimeoutId = setTimeout(function() {
                reset();
            }, 500);
        },

        pageResults = function() {
            getResults();
        },
        lastresults,
        getResults = function () {
            console.log("getresults");
            var sector = mapView.getSector();
            var type = controlsView.getSelectedType();
            var itemTypes = controlsView.getSelectedItemTypes();
            var pageSize = paginationView.getPageSize();
            var page = paginationView.getPage();
            var offset = pageSize * (page -1);
            var request = new LostAndFound.Model.ReportsRequest(sector, type, itemTypes, offset, pageSize);

            model.getReports(request, function (newResults, removedResults) {
                settleTimeoutId = null;
                // untill there is some sophisticated filtering
                removedResults = lastresults;
                lastresults = newResults;
                // 
                for (var key in resultViews) {
                    resultViews[key].removeReports(removedResults);
                    resultViews[key].displayReports(newResults);
                }
            });
            return request;
        },

        reset = function () {
            console.log("reset");
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
