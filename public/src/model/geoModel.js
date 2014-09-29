LostAndFound.Model.GeoModel = (function () {
    var that = {},
        initialLocation = { lng: 10, lat: 50, zoom: 5 },
        storageKey = "map-options",

        init = function () {
            return that;
        },

        getDefaultLocation = function () {
            if (window.city) {
                return window.city;
            }
            return restoreSavedSettings() || initialLocation;
        },

        saveGeoSettings = function (options) {
            localStorage.setItem(storageKey, JSON.stringify(options));
        },

        restoreSavedSettings = function () {
            var settings = localStorage.getItem(storageKey);
            if (settings) {
                settings = JSON.parse(settings);
                return settings;
            }
            return null;
        },

        getCurrentLocation = function (callback) {
            if (window.city) {
                callback(window.city);
                return;
            }
            var defaultLoc = getDefaultLocation();
            callback(defaultLoc);

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {}
                    pos.lng = position.coords.longitude;
                    pos.lat = position.coords.latitude;
                    callback(pos);
                }, function () {

                });
            }
        };

    that.saveGeoSettings = saveGeoSettings;
    that.getDefaultLocation = getDefaultLocation;
    that.getCurrentLocation = getCurrentLocation;
    that.init = init;
    return that;
}());