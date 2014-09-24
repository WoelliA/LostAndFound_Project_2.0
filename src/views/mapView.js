﻿LostAndFound.Views.MapView = (function () {
    var that = {},
        sectorChangedEvent = "sector_changed",
        map,
        $mapCanvas,
        markers = {},

        init = function (context, point) {
            var mapOptions = {
                zoom: 11
            };

            if (point) {
                mapOptions.center = new google.maps.LatLng(point.lat, point.lng);
            }

            var $maps = $(".map-canvas", context);
            $mapCanvas = $($maps[0]);
            map = new google.maps.Map($maps[0], mapOptions);
            google.maps.event.addListener(map, "bounds_changed", function () {
                $(that).trigger(sectorChangedEvent);
            });

            $(window).resize(onresize);

            setTimeout(function () {
                google.maps.event.trigger(map, 'resize');
                map.setCenter(point);
            }, 200);

            return that;
        },

        lastMapWidth,
        onresize = function () {
            var mapWidth = $mapCanvas.css('width');
            if (mapWidth != lastMapWidth) {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            }
        },

        setCenter = function (point) {
            var loc = new google.maps.LatLng(point.lat, point.lng);
            map.setCenter(loc);
        },

        addMarker = function (report) {
            var id = report.id;
            var icon = new LostAndFound.Views.Icon(report);
            var location = new google.maps.LatLng(report.lat, report.lng);

            var marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: icon
            });

            google.maps.event.addListener(marker, 'click', function () {
                $(that).trigger("report-selected", id);
            });
            markers[id] = marker;
        },

        displayReport = function (report) {
            addMarker(report);
        },

        displayReports = function (reports) {
            for (var key in reports) {
                var report = reports[key];
                addMarker(report);
            }
        },

        removeReports = function (reports) {
            if (!reports) {
                return;
            }
            console.log(markers);
            reports.forEach(function (report) {
                var key = report.id;
                var marker = markers[key];
                if (marker) {
                    marker.setMap(null);
                    markers[key] = null;
                }
            });
        },

        getSector = function () {
            var bounds = map.getBounds();
            var longMin = bounds.getNorthEast().lng();
            var latMin = bounds.getNorthEast().lat();
            var longMax = bounds.getSouthWest().lng();
            var latMax = bounds.getSouthWest().lat();
            var sector = new LostAndFound.Model.Sector(longMin, longMax, latMin, latMax);
            return sector;
        };


    that.getSector = getSector;
    that.displayReport = displayReport;
    that.removeReports = removeReports;
    that.displayReports = displayReports;
    that.init = init;
    that.setCenter = setCenter;
    return that;
}());