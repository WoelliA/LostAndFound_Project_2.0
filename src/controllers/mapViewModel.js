/// <reference path="../../../../../../github/woellidev.common.typescript/events/event.ts" />
var ViewModels;
(function (ViewModels) {
    var Event = Events.Event;

    var MapViewModel = (function () {
        function MapViewModel() {
            MapViewModel.current = this;
            this.zoomChanged = new Event();
        }
        MapViewModel.prototype.init = function (parameters) {
            var _this = this;
            setTimeout(function () {
                console.log("triggering zoom changed");
                _this.zoomChanged.dispatch(new ZoomChangedEventArgs());
            }, 2000);
        };
        return MapViewModel;
    })();
    ViewModels.MapViewModel = MapViewModel;

    var ZoomChangedEventArgs = (function () {
        function ZoomChangedEventArgs() {
        }
        return ZoomChangedEventArgs;
    })();
    ViewModels.ZoomChangedEventArgs = ZoomChangedEventArgs;
})(ViewModels || (ViewModels = {}));
//# sourceMappingURL=mapViewModel.js.map
