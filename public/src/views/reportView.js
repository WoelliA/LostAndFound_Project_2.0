LostAndFound.Views.ReportView = (function () {
    var that = {},
        reportTemplate,
        $detailsFrame,

        init = function (element) {
            element = element || document;

            reportTemplate = $('#report-detail-template').html();
            Mustache.parse(reportTemplate);
            $detailsFrame = $("#details-frame", element);
            initFacebook();
            return that;
        },

        displayReport = function (report) {
            var entry = Mustache.render(reportTemplate, report);
            $detailsFrame.html(entry);
        },

        initFacebook = function () {
            $('.facebook-control').attr('data-href', window.location);
            if (!FB) {
                setTimeout(function () {
                    initFacebook();
                }, 500);
                return;
            }
            FB.XFBML.parse();

        };

    that.displayReport = displayReport;
    that.init = init;
    return that;
}());