LostAndFound.Controllers.ReportController = (function () {
    var that = {},
        reportsModel,
        commentsModel,
        detailsView,
        mapView,
        commentsView,
        reportId,

        init = function (args) {
            console.log("report controller init", args);
            reportId = args.parameters[0];

            reportsModel = args.ReportsModel.init();
            commentsModel = args.CommentsModel.init();

            commentsView = LostAndFound.Views.CommentsView.init(args.frame);
            detailsView = LostAndFound.Views.ReportView.init(args.frame);

            console.log(reportsModel);

            reportsModel.getReport(reportId, function (report) {
                detailsView.displayReport(report);
                mapView = LostAndFound.Views.MapView.init(args.frame, report);
                mapView.displayReport(report);
            });

            getComments(0, 10);
            attachEventListeners();
            return that;
        },

        attachEventListeners = function() {
            $(commentsView).on("comment-submit", function (evt, text) {
                console.log("comment submit", text);
            });
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