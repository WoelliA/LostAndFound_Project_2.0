///#source 1 1 /src/model/userModel.js
LostAndFound.Model.UserModel = (function () {
    var that = {},

        init = function () {

            return that;
        };

    that.init = init;
    return that;

}());
///#source 1 1 /src/model/commentsModel.js
LostAndFound.Model.CommentsModel = (function () {
    var that = {},

        init = function() {

            return that;
        },

        getReportsComments = function(reportId, callback) {

        };

    that.getReportsComments = getReportsComments;
    that.init = init;
    return that;

}());
///#source 1 1 /src/model/geoModel.js
LostAndFound.Model.GeoModel = (function () {
    var that = {},
        initialLocation = { lng: 10, lat: 50 },

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
                    initialLocation.lng = position.coords.longitude;
                    initialLocation.lat = position.coords.latitude;
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
///#source 1 1 /src/model/reportsModel.js
LostAndFound.Model.ReportsModel = (function () {
    var that = {},

        init = function () {

            return that;
        },

         getReport = function (reportId, callback) {

         },

        getReports = function (request, callback) {
            /// <param name="request" type="LostAndFound.Model.ReportsRequest">The request.</param>

        };

    that.getReport = getReport;
    that.getReports = getReports;
    that.init = init;
    return that;

}());
///#source 1 1 /src/model/configModel.js
LostAndFound.Model.ConfigModel = (function () {
    var that = {},

        init = function () {

            return that;
        },

             getItemTypes = function (callback) {

             };

    that.getItemTypes = getItemTypes;

    that.init = init;
    return that;

}());
