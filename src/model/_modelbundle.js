///#source 1 1 /src/model/report.js
LostAndFound.Model.Report = function() {
    var lng, lat, id;
}
///#source 1 1 /src/model/reportsRequest.js
LostAndFound.Model.ReportsRequest = function (sector) {
    this.sector = sector;
};
///#source 1 1 /src/model/sector.js
LostAndFound.Model.Sector = function (longMin, longMax, latMin, latMax) {
    this.longMin = longMin;
    this.longMax = longMax;
    this.latMin = latMin;
    this.latMax = latMax;
}
///#source 1 1 /src/model/reportsModel.js
LostAndFound.Model.ReportsModel = (function() {
    var that = {},

        init = function () {

            return that;
        },

        getReports = function (request, callback) {
            /// <param name="request" type="LostAndFound.Model.ReportsRequest">The request.</param>

        };

    that.getReports = getReports;
    that.init = init;
    return that;

}());
///#source 1 1 /src/model/userModel.js
LostAndFound.Model.UserModel = (function () {
    var that = {},

        init = function () {

            return that;
        };

    that.init = init;
    return that;

}());
///#source 1 1 /src/model/geoModel.js
LostAndFound.Model.GeoModel = (function () {
    var that = {},
        initialLocation = { x: 10, y: 50 },

        init = function () {
            return that;
        },

        getDefaultLocation = function () {
            return initialLocation;
        },

        getCurrentLocation = function (callback) {
            var browserSupportFlag = new Boolean();

            // Try W3C Geolocation (Preferred)
            if (navigator.geolocation) {
                browserSupportFlag = true;
                navigator.geolocation.getCurrentPosition(function (position) {
                    initialLocation.x = position.coords.longitude;
                    initialLocation.y = position.coords.latitude;
                    callback(initialLocation);
                }, function () {
                    handleNoGeolocation(browserSupportFlag);
                });
            }
                // Browser doesn't support Geolocation
            else {
                browserSupportFlag = false;
                handleNoGeolocation(browserSupportFlag);
            }

            function handleNoGeolocation(errorFlag) {
                if (errorFlag) {
                    alert("Geolocation service failed.");
                }
                callback(initialLocation);
            }
        };

    that.getDefaultLocation = getDefaultLocation;
    that.getCurrentLocation = getCurrentLocation;
    that.init = init;
    return that;
}());
