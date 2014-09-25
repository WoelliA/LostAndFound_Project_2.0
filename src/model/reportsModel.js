LostAndFound.Model.ReportsModel = (function () {
    var that = {},
        Report = Parse.Object.extend("report"),
        excludedKeys = ['lat', 'lng', 'imageURL', 'category'],
        allReports = [],

        init = function () {
            return that;
        },

        getReport = function (reportId, callback) {
            if (allReports[reportId]) {
                callback(allReports[reportId]);
                return;
            }
        },

        saveReport = function (r, callbackObject) {
            /// <param name="r" type="LostAndFound.Model.Report"></param>
            var report = new Report();
            for (var key in r) {
                var value = r[key];
                if (value instanceof Function || excludedKeys.indexOf(key) >= 0) {
                    continue;
                }
                report.set(key, r[key]);
            }

            var location = new Parse.GeoPoint(r.lat, r.lng);
            var c = createCategory(r.category.id);
            report.set('category', c);
            report.set('location', location);

            if (r.imageURL) {
                var image = createFile(r.imageURL);
                image.save().then(function () {
                    report.set('image', image);
                    saveParseReport(report, callbackObject);
                }, function (error) {
                    console.log(error);
                });
            } else {
                saveParseReport(report, callbackObject);
            }
        },


        saveParseReport = function (parseReport, callbackObject) {
            parseReport.save({
                success: function () {
                    var modelReport = createResults([parseReport])[0];
                    callbackObject.success(modelReport);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },

        createFile = function (base64url) {
            var o = { base64: base64url }
            var file = new Parse.File("afile", o);
            return file;
        },

        getReportsCount = function (request, callbackObject) {
            var query = buildQuery(request);

            query.count({
                success: function (count) {
                    callbackObject.success(count);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },

        buildQuery = function (request) {
            /// <param name="request" type="LostAndFound.Model.ReportsRequest"></param>

            var query = new Parse.Query(Report);
            var s = request.sector;
            query.equalTo('type', request.type);
            var categories = createCategories(request.itemTypes);
            query.containedIn('category', categories);

            var southwestOfSf = new Parse.GeoPoint(s.latMin, s.longMin);
            var northeastOfSf = new Parse.GeoPoint(s.latMax, s.longMax);
            query.withinGeoBox("location", northeastOfSf, southwestOfSf);
            return query;
        },

        createCategories = function (itemTypeIds) {
            var categories = [];
            for (var i = 0; i < itemTypeIds.length; i++) {
                categories.push(createCategory(itemTypeIds[i]));
            }
            return categories;
        },

        createCategory = function (id) {
            var Category = Parse.Object.extend('category');
            var c = new Category();
            c.set('id', id);
            return c;
        },

        createResults = function (parseReports) {
            var reports = LostAndFound.Model.ParseHelper.copyArray(parseReports, function () {
                return new LostAndFound.Model.Report();
            });
            if (reports) {
                reports.forEach(function (report) {
                    if (report) {
                        allReports[report.id] = report;
                        if (report.category) {
                            var categoryId = report.category.id;
                            var category = LostAndFound.Model.ConfigModel.getItemTypeForId(categoryId);
                            report.category = category;
                        }

                        if (report.image) {
                            report.imageURL = report.image.url();
                        }

                        if (report.location) {
                            report.lng = report.location.longitude;
                            report.lat = report.location.latitude;
                        }
                    }
                });
            }

            return reports;
        },

        getReports = function (request, callback) {
            /// <param name="request" type="LostAndFound.Model.ReportsRequest">The request.</param>
            var query = buildQuery(request);
            query.limit(request.pageSize);
            query.skip(request.offset);
            query.descending("createdAt");
            query.find({
                success: function (results) {
                    callback(createResults(results));
                }, error: function (error) {
                    console.log(error);
                }
            });
        };

    that.getReportsCount = getReportsCount;
    that.saveReport = saveReport;
    that.getReport = getReport;
    that.getReports = getReports;
    that.init = init;
    return that;

}());