LostAndFound.Views.ListView = (function () {
    var that = {},
        template,
        $list,

        init = function(element) {
            $list = $("#reports-list", element);
            $("#reports-list").on('click', 'li', function(evt) {
                $(that).trigger("report-selected", evt.currentTarget.attributes['data-id'].value);
            });
            template = $('#report-template').html();
            Mustache.parse(template);
            return that;
        },

        displayReports = function(reports) {
            for (var key in reports) {
                var report = reports[key];
                addReport(report);
            }
        },

        addReport = function(report) {
            var entry = Mustache.render(template, report);
            entry["data-id"] = report.id;
            $list.append(entry);
        },

        removeReports = function (reports) {
            if (!reports) {
                return;
            }

            for (var key in reports) {
                var report = reports[key];
                removeReport(report);
            }
        },

        clear = function() {
            $list.html("");
        },

        removeReport = function (report) {
            $('[data-id="' + report.id + '"]', $list).remove();
        };

    that.clear = clear;
    that.removeReports = removeReports;
    that.displayReports = displayReports;
    that.init = init;
    return that;
}());