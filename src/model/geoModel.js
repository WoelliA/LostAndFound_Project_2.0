LostAndFound.Model.GeoModel = (function () {
    var that = {},
        initialLocation = { lng: 10, lat: 50 },
        storageKey = "map-options",

        init = function () {
            return that;
        },

        getDefaultLocation = function () {
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
            var storedSettings = restoreSavedSettings();
            if (storedSettings) {
                callback(storedSettings);
                return;
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    initialLocation.lng = position.coords.longitude;
                    initialLocation.lat = position.coords.latitude;
                    callback(initialLocation);
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