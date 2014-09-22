LostAndFound.Model.Dummy.ReportsModel = (function () {
    var that = {},
        allReports = [],
        reports = [],


        init = function() {
            console.log("dummymodel init");
            return that;
        },

        getReport = function(reportId, callback) {
            setTimeout(function() {
                callback(allReports[reportId]);
            }, LostAndFound.Model.Dummy.Config.delay);

        },

        getReports = function (request, callback) {
            /// <param name="request" type="LostAndFound.Model.ReportsRequest">The request.</param>
            console.log("getreqports", request);
            setTimeout(function () {
                var oldReports = reports;
                reports =[];
                for (var i = 0; i < 20; i++) {
                    var report = new LostAndFound.Model.Dummy.DummyReport(i, request);
                    allReports[report.id] = report;
                    reports.push(report);
                }
                callback(reports, oldReports);
            }, LostAndFound.Model.Dummy.Config.delay);
        };

    that.getReport = getReport;
    that.getReports = getReports;
    that.init = init;
    return that;
}());