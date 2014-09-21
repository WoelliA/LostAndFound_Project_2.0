LostAndFound.Model.Dummy.ReportsModel = (function () {
    var that = {},
        
        reports = [],


        init = function () {
            console.log("dummymodel init");
            return that;
        },

        getReports = function (request, callback) {
            /// <param name="request" type="LostAndFound.Model.ReportsRequest">The request.</param>
            console.log("getreqports", request);
            setTimeout(function () {
                var oldReports = reports;
                reports =[];
                for (var i = 0; i < 20; i++) {
                    reports.push(new LostAndFound.Model.Dummy.DummyReport(i, request));
                }
                callback(reports, oldReports);
            }, LostAndFound.Model.Dummy.Config.delay);
        };

    that.getReports = getReports;
    that.init = init;
    return that;
}());