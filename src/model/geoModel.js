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