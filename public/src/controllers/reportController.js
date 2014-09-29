LostAndFound.Controllers.ReportController = (function () {
    var that = {},
        reportsModel,
        reportView,
        mapView,
        reportId,
        
        init = function (args) {
            reportId = args.parameters[0];

            var shareController = LostAndFound.Controllers.ShareController.init(args);

            reportsModel = args.ReportsModel.init();
            reportView = LostAndFound.Views.ReportView.init(args.frame);


            reportsModel.getReport(reportId, function (report) {
                reportView.displayReport(report);
                report.zoom = 12;
                mapView = LostAndFound.Views.MapView.init(args.frame, report);
                mapView.displayReport(report);
                shareController.setShareText(report.getShareText());
            });

            return that;
        };

    that.init = init;
    return that;
}());