LostAndFound.Views.MapView = (function () {
    var that = {},
        sectorChangedEvent = "sector_changed",
        map,

        markers = {},

        init = function (element, point) {
            console.log("mapview init", point);
            var mapOptions = {
                center: new google.maps.LatLng(point.y, point.x),
                zoom: 11
            };
            map = new google.maps.Map(element.getElementById("map-canvas"), mapOptions);
            google.maps.event.addListener(map, "bounds_changed", onBoundsChanged);
            return that;
        },

        onBoundsChanged = function () {
            var bounds = map.getBounds();
            var longMin = bounds.getNorthEast().lng();
            var latMin = bounds.getNorthEast().lat();
            var longMax = bounds.getSouthWest().lng();
            var latMax = bounds.getSouthWest().lat();
            var sector = new LostAndFound.Model.Sector(longMin, longMax, latMin, latMax);
            $(that).trigger(sectorChangedEvent, sector);
        },

        setCenter = function (point) {
            var loc = new google.maps.LatLng(point.y, point.x);
            map.setCenter(loc);
        },

        addMarker = function(id, location) {
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
            markers[id] = marker;
        },

        displayReports = function (reports) {
            /// <param name="reports" type="LostAndFound.Model.Report"></param>
            for (var key in reports) {
                var report = reports[key];
                var location = new google.maps.LatLng(report.lat, report.lng);
                console.log(location);
                addMarker(report.id, location);
            }
        },

        removeReports = function (reports) {
            reports.forEach(function (report) {
                var key = report.id;
                var marker = markers[key];
                if (marker) {
                    marker.setMap(null);
                    markers[key] = null;
                }
            });
        };

    that.removeReports = removeReports;
    that.displayReports = displayReports;
    that.init = init;
    that.setCenter = setCenter;
    return that;
}());