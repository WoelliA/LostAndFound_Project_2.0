LostAndFound.Views.SubmitReportMapView = (function () {
    var that = {},
        map,
        marker,
        position,

        init = function (context, options) {
            options.center = new google.maps.LatLng(options.lat, options.lng);
            
            var $maps = $(".map-canvas", context);
            map = new google.maps.Map($maps[0], options);

            if (options.zoom) {
                map.setZoom(options.zoom);
            }

            google.maps.event.addListener(map, 'rightclick', function (evt) {
                var latLng = evt.latLng;
                setCenter({
                    lat: latLng.lat(), lng: latLng.lng()
                });
            });

            google.maps.event.addListener(map, 'center_changed', function () {
                var latLng = map.getCenter();
                if (marker) {
                    marker.setAnimation(null);
                    marker.setPosition(latLng);
                    position = {
                        lat: latLng.lat(),
                        lng: latLng.lng()
                    };
                    $('.set-location-hint').addClass("hidden");
                }
            });
            return that;
        },

        adjust = function (report) {
            if (marker) {
                marker.setIcon(new LostAndFound.Views.Icon(report));
            }
        },

        setup = function (report) {
            if (map && report) {
                var loc = new google.maps.LatLng(report.lat, report.lng);
                map.setCenter(loc);
                if (report.zoom) {
                    map.setZoom(report.zoom);
                }

                var icon = new LostAndFound.Views.Icon(report);
                if (marker) {
                    marker.setMap(null);
                    position = report;
                }

                marker = new google.maps.Marker({
                    position: loc,
                    map: map,
                    icon: icon,
                    draggable: true,
                });

                if (!position) {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }

                google.maps.event.addListener(marker, 'drag', function () {
                    map.setCenter(marker.getPosition());
                });
                google.maps.event.addListener(marker, 'dragstart', function () {
                    marker.setAnimation(null);
                });

                google.maps.event.addListener(marker, 'dragend', function () {
                    position = marker.getPosition();
                });
            }
        };

    that.getPosition = function () { return position; };
    that.adjust = adjust;
    that.setup = setup;
    that.init = init;
    return that;
}());