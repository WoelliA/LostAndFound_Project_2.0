
LostAndFound.Controllers.MainController = (function () {
    var that = {},
        listView,
        mapView,
        model,
        settleTimeoutId,
        resultViews = [],
        controlsView,
        paginationView,

        init = function (args) {
            model = args.ReportsModel.init();

            console.log("maincontroller init", LostAndFound.Views, args);
            var views = LostAndFound.Views;

            controlsView = views.ControlsView.init(args.frame);
            paginationView = views.PaginationView.init(args.frame);
            paginationView.setupPagination(31);
            var point = args.GeoModel.getDefaultLocation();
            listView = views.ListView.init(document);
            mapView = views.MapView.init(args.frame, point);

            resultViews.push(listView);
            resultViews.push(mapView);

            args.GeoModel.getCurrentLocation(function (p) {
                mapView.setCenter(p);
            });

            args.ConfigModel.init().getItemTypes(function(types) {
                controlsView.displayItemTypes(types);
            });

            attachListeners();
            return that;
        },

        attachListeners = function () {
            $(mapView).on("sector_changed", kickoffGetReports);
            $(mapView).on("report-selected", onReportSelected);
            $(listView).on("report-selected", onReportSelected);
            $(controlsView).on("type-changed", getReports);
            $(controlsView).on("item-types-changed", kickoffGetReports);
        },

        onReportSelected = function (evt, reportId) {
            window.location.hash = "#/report/" + reportId;
            //History.pushState(reportId, reportId, "/#report/" + reportId);
            console.log(reportId);
        },

        kickoffGetReports = function() {
            if (settleTimeoutId) {
                clearTimeout(settleTimeoutId);
                settleTimeoutId = null;
            }
            settleTimeoutId = setTimeout(function() {
                getReports();
            }, 500);
        },

        getReports = function () {
            var sector = mapView.getSector();
            var type = controlsView.getSelectedType();
            var itemTypes = controlsView.getSelectedItemTypes();
            var pageSize = paginationView.getPageSize();
            var page = paginationView.getPage();
            var offset = pageSize * page;
            var request = new LostAndFound.Model.ReportsRequest(sector, type, itemTypes, offset, pageSize);
           
            console.log("fucking request",request);
            model.getReports(request, function (newResults, removedResults) {
                settleTimeoutId = null;
                for (var key in resultViews) {
                    resultViews[key].displayReports(newResults);
                    resultViews[key].removeReports(removedResults);
                }
            });
        };

    that.init = init;
    return that;
}());
