LostAndFound.Views.ReportView = (function () {
    var that = {},
        reportTemplate,
        $detailsFrame,

        init = function (element) {
            element = element || document;

            reportTemplate = $('#report-detail-template').html();
            Mustache.parse(reportTemplate);
            $detailsFrame = $("#details-frame", element);

            $('.facebook-control').attr('data-href', window.location);
            FB.XFBML.parse();
            return that;
        },

        displayReport = function (report) {
            console.log("DISPLAYING REPORT", report);
            var entry = Mustache.render(reportTemplate, report);
            $detailsFrame.html(entry); 

            FB.XFBML.parse(document.getElementById('details-frame'));
        };

    that.displayReport = displayReport;
    that.init = init;
    return that;
}());