LostAndFound.Model.Dummy.ReportsModel = (function () {
    var that = {},
        allReports = [],
        reports = [],


        init = function() {
            console.log("dummymodel init");
            return that;
        },

        saveReport = function(report, callback) {
            setTimeout(function () {
                console.log("dummy save report done");
                callback.success();
            }, LostAndFound.Model.Dummy.Config.delay);
        },

        getReport = function(reportId, callback) {
            setTimeout(function() {
                callback(allReports[reportId]);
            }, LostAndFound.Model.Dummy.Config.delay);
        },

        getReportsCount = function(request, callbackObject) {
            setTimeout(function () {
                callbackObject.success(21);
            }, LostAndFound.Model.Dummy.Config.delay);
        },

        getReports = function (request, callback) {
            /// <param name="request" type="LostAndFound.Model.ReportsRequest">The request.</param>
            console.log("getreqports", request);
            setTimeout(function () {
                var oldReports = reports;
                reports =[];
                for (var i = 0; i < request.pageSize; i++) {
                    var report = new LostAndFound.Model.Dummy.DummyReport(i, request);
                    allReports[report.id] = report;
                    reports.push(report);
                }
                callback(reports, oldReports);
            }, LostAndFound.Model.Dummy.Config.delay);
        };

    that.getReportsCount = getReportsCount;
    that.saveReport = saveReport;
    that.getReport = getReport;
    that.getReports = getReports;
    that.init = init;
    return that;
}());