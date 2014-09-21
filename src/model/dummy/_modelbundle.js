///#source 1 1 /src/model/dummy/reportsModel.js
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
///#source 1 1 /src/model/dummy/userModel.js
LostAndFound.Model.Dummy.UserModel = (function () {
    var that = {},

        init = function () {

            return that;
        };

    that.init = init;
    return that;

}());
///#source 1 1 /src/model/dummy/geoModel.js
LostAndFound.Model.Dummy.GeoModel = LostAndFound.Model.GeoModel;
///#source 1 1 /src/model/dummy/dummyReport.js
dummyreportscreated = 0;
LostAndFound.Model.Dummy.DummyReport = function (num, request) {
    /// <param name="num" type="Number"></param>
    /// <param name="request" type="LostAndFound.Model.ReportsRequest"></param>
    LostAndFound.Model.Report.call(this);

    dummyreportscreated++;

    this.getRandomCoords =  function (sector) {
        /// <param name="sector" type="LostAndFound.Model.Sector"></param>   
        var longfactor = Math.random();
        var latFactor = Math.random();

        var lng = sector.longMin + ((sector.longMax - sector.longMin) * longfactor);
        var lat = sector.latMin + ((sector.latMax - sector.latMin) * latFactor);
        return { lng: lng, lat: lat };
    };

    var coords = this.getRandomCoords(request.sector);
    this.id = dummyreportscreated;
    this.lng = coords.lng;
    this.lat = coords.lat;
    this.title = "Dummy Title " + this.id;
    this.description = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit";
    this.imageURL = "http://bikechicago.info/securebike.jpg";
}
///#source 1 1 /src/model/dummy/config.js
LostAndFound.Model.Dummy.Config = {
    delay: 1000

};
