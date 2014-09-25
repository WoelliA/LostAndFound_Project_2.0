LostAndFound.Controllers.ReportController = (function () {
    var that = {},
        reportsModel,
        commentsModel,
        detailsView,
        mapView,
        commentsView,
        reportId,
        
        init = function (args) {
            reportId = args.parameters[0];

            var shareController = LostAndFound.Controllers.ShareController.init(args);

            reportsModel = args.ReportsModel.init();
            commentsModel = args.CommentsModel.init();

            commentsView = LostAndFound.Views.CommentsView.init(args.frame);
            detailsView = LostAndFound.Views.ReportView.init(args.frame);


            reportsModel.getReport(reportId, function (report) {
                detailsView.displayReport(report);
                mapView = LostAndFound.Views.MapView.init(args.frame, report);
                mapView.displayReport(report);
                shareController.setShareText(report.getShareText());
            });

            getComments(0, 10);
            return that;
        },
        
        getComments = function (offset, count) {
            var commentsRequest = new LostAndFound.Model.CommentsRequest(offset, count, reportId);
            commentsModel.getReportsComments(commentsRequest, function (comments) {
                commentsView.addDisplayComments(comments);
            });
        };

    that.init = init;
    return that;
}());