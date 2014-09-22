LostAndFound.Views.ReportView = (function () {
    var that = {},
        reportTemplate,
        $detailsFrame,
        $commentsList,

        init = function (element) {
            element = element || document;

            reportTemplate = $('#report-detail-template').html();
            Mustache.parse(reportTemplate);

            $detailsFrame = $("#details-frame", element);
            $commentsList = $("#comments-list", element);
            return that;
        },

        displayReport = function (report) {
            var entry = Mustache.render(reportTemplate, report);
            $detailsFrame.html(entry);
        };

    that.displayReport = displayReport;
    that.init = init;
    return that;
}());