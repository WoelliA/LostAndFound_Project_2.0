LostAndFound.Views.SubmitReportMapView = (function () {
    var that = {},
        map,
        marker,
        position,

        init = function (options) {
            var $maps = $(".map-canvas");
            if (options) {
                console.warn("map init", options);
                var mapoptions = { center: new google.maps.LatLng(options.lat, options.lng) };

                mapoptions.zoom = options.zoom || 10;

                map = new window.google.maps.Map($maps[0], mapoptions);
            } else {
                setTimeout(function () {
                    init(options);
                }, 200);
            }
            setTimeout(function () {
                google.maps.event.trigger(map, 'resize');
            }, 200);
            return that;
        },

        adjust = function (report) {
            if (marker) {
                marker.setIcon(new LostAndFound.Views.Icon(report));
            }
        },

        setup = function (report) {
            if (!map) {
                init(report);
            }

            if (report && report.lat && report.lng) {
                var loc = new window.google.maps.LatLng(report.lat, report.lng);
                map.setCenter(loc);
                if (report.zoom) {
                    map.setZoom(report.zoom);
                }

                var icon = new LostAndFound.Views.Icon(report);
                if (marker) {
                    marker.setMap(null);
                    position = report;
                }

                marker = new window.google.maps.Marker({
                    position: loc,
                    map: map,
                    icon: icon,
                    draggable: true,
                });

                if (!position) {
                    marker.setAnimation(window.google.maps.Animation.BOUNCE);
                }

                window.google.maps.event.addListener(marker, 'drag', function () {
                    var center = marker.getPosition();
                    if (center) {
                        map.setCenter(marker.getPosition());
                    }
                });
                window.google.maps.event.addListener(marker, 'dragstart', function () {
                    if (marker)
                        marker.setAnimation(null);
                });

                window.google.maps.event.addListener(marker, 'dragend', function () {
                    position = marker.getPosition();
                });

                window.google.maps.event.addListener(map, 'center_changed', function () {
                    if (!map) {
                        return;
                    }
                    var latLng = map.getCenter();
                    if (marker && latLng) {
                        marker.setAnimation(null);
                        marker.setPosition(latLng);
                        position = {
                            lat: latLng.lat(),
                            lng: latLng.lng()
                        };
                        $('.set-location-hint').addClass("hidden");
                    }
                });
            }
        };

    that.getPosition = function () { return position; };
    that.adjust = adjust;
    that.setup = setup;
    that.init = init;
    return that;
}());