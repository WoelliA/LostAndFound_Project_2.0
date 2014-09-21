LostAndFound.Views.ListView = (function () {
    var that = {},
        template,
        $list,

        init = function (element) {
            console.log("listview init");
            $list = $("#reports-list", element);
            $("#reports-list").on('click', 'li', function (evt) {
                $(that).trigger("report-selected", evt.currentTarget.attributes['data-id'].value);
            });
            template = $('#report-template').html();
            Mustache.parse(template);
            return that;
        },

        displayReports = function (reports) {
            for (var key in reports) {
                var report = reports[key];
                addReport(report);
            }
        },

        addReport = function (report) {
            var entry = Mustache.render(template, report);
            $list.append(entry);
        },

        removeReports = function (reports) {

        };

    that.removeReports = removeReports;
    that.displayReports = displayReports;
    that.init = init;
    return that;
}());