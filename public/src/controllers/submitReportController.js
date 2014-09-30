
LostAndFound.Controllers.SubmitReportController = (function () {
    var that = {},
        submitView,
        mapView,
        configModel,
        controlsView,
        reportsModel,
        loadingView,

        init = function (args) {
            var geoModel = args.GeoModel.init();
            controlsView = LostAndFound.Views.ControlsView.init(args.frame);
            mapView = LostAndFound.Views.SubmitReportMapView.init();
            submitView = LostAndFound.Views.SubmitReportView.init(args.frame);
            loadingView = LostAndFound.Views.LoadingView.init();

            reportsModel = args.ReportsModel.init();

            geoModel.getCurrentLocation(function (loc) {
                var report = new LostAndFound.Model.Report();
                report.lng = loc.lng;
                report.lat = loc.lat;
                report.zoom = loc.zoom;
                report.type = controlsView.getSelectedType();
                report.getCategoryName = function () { return undefined; };
                mapView.setup(report);
            });

            configModel = args.ConfigModel.init();
            configModel.getItemTypes(function (categories) {
                submitView.setCategories(categories);
            });
            
            submitView.adjustLabels(controlsView.getSelectedType());

            attachListeners();

            return that;
        },

        createReport = function() {
            var report = new LostAndFound.Model.Report();
            var position = mapView.getPosition();
            if (position) {
                report.lng = position.lng;
                report.lat = position.lat;
            }
            report.email = submitView.getEmail();
            report.phoneNumber = submitView.getPhoneNumber();
            report.reward = submitView.getReward();
            report.type = controlsView.getSelectedType();
            report.when = submitView.getDate();
            report.imageURL = submitView.getImageData();

            var categoryId = submitView.getCategoryId();
            if (categoryId) {
                report.category = configModel.getItemTypeForId(categoryId);
            }
            report.title = submitView.getTitle();
            report.description = submitView.getDescription();
            return report;
        },

        attachListeners = function () {
            $(submitView).on('category-changed', onInputChanged);
            $(controlsView).on('type-changed', function() {
                onInputChanged();
                submitView.adjustLabels(controlsView.getSelectedType());
            });
            $(submitView).on('report-submit', onReportSubmit);
        },

        onReportSubmit = function() {
            var report = createReport();
            if (!(report.lng && report.lat)) {
                var verb = report.type == "lost" ? "verloren" : "gefunden";
                alert("Bitte gib an, wo du den Gegenstand " + verb + " hast, indem du den Punkt auf der Karte markierst.");
                return;
            }
            loadingView.show();
            reportsModel.saveReport(report, {
                success: function (r) {
                    onReportSaved(r);
                    loadingView.hide();
                },
                error: function() {
                    loadingView.hide();
                }
            });
        },

        onReportSaved = function (report) {
            var parameters = {};
            parameters.url = window.location.origin + "/report/" + report.id;
            parameters.text = report.getShareText();
            LostAndFound.ModalPresenter.showWithoutLocation("share", parameters);
            History.pushState(null, null, "main");
        },

        saveReportLocally = function (report) {

            // not implemented yet _ TODO
            var key = "users-reports";
            var reports = [];
            if (localStorage[key]) {
                reports = JSON.parse(localStorage.getItem(key));
            }
            reports = [report].concat(reports);
            localStorage.setItem(key, JSON.stringify(reports));
        },

        onInputChanged = function() {
            var report = createReport();
            mapView.adjust(report);
        };

    that.init = init;
    return that;
}());
