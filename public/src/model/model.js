LostAndFound.Model.Comment = function() {
    var id, user, content;
}
LostAndFound.Model.Report = function () {
    var _this = this;
    this.lng;
    this.lat;
    this.id;
    this.imageURL;
    this.description;
    this.title ;
    this.type ;
    this.category;
    this.reward ;
    this.when ;
    this.email ;
    this.phoneNumber;

    this.getImage = function () {
        var image = this.imageURL || "/res/images/placeholders/" + this.category.shortname + ".png";
        return image;
    };

    this.getShareText = function() {
        var text = this.title;
        if (this.description) {
            text += " - " + this.description;
        }
        return text;
    };

    this.getCategoryName = function () {
        if (this.category) {
            return this.category.shortname;
        }
        return undefined;
    };

    this.getType = function () {
        return this.type;
    };

}
LostAndFound.Model.Sector = function (longMin, longMax, latMin, latMax) {
    this.longMin = longMin;
    this.longMax = longMax;
    this.latMin = latMin;
    this.latMax = latMax;
}
LostAndFound.Model.User = function() {
    var id, imageURL, info, name;
}
LostAndFound.Model.ItemType = function(id, name, shortname) {
    this.id = id;
    this.name = name;
    this.shortname = shortname;
}

///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 requestsbundle.js
///#source 1 1 /src/model/requests/reportsRequest.js
LostAndFound.Model.ReportsRequest = function (sector, type, itemTypes, offset, pageSize) {
    this.sector = sector;
    this.type = type;
    this.itemTypes = itemTypes;
    this.offset = offset;
    this.pageSize = pageSize;
};
///#source 1 1 /src/model/requests/commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

///#source 1 1 commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};

LostAndFound.Model.ParseHelper = {
    copyAttributes: function (target, parseObject) {
        var attributes = parseObject.attributes;
        for (var key in attributes) {
            target[key] = attributes[key];
        }
        target.id = parseObject.id;
    },

    copyArray: function (parseObjects, creationDelegate) {
        var results = [];
        for (var index in parseObjects) {
            var parseObject = parseObjects[index];

            var object = creationDelegate ? creationDelegate() : {};
            this.copyAttributes(object, parseObject);
            results.push(object);
        }
        return results;
    }
}
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
            var query = new Parse.Query('report');
            query.include('category');
            query.get(reportId, function (parseReport) {
                var report = createResults([parseReport])[0];
                callback(report);
            });
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
                            var category = {};
                            if (report.category.get('shortname')) {
                                LostAndFound.Model.ParseHelper.copyAttributes(category, report.category);
                            } else {
                                category = LostAndFound.Model.ConfigModel.getItemTypeForId(categoryId);
                            }
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
LostAndFound.Model.ConfigModel = (function () {
    var that = {},
        Category = Parse.Object.extend('category'),
        categoriesHashMap = {},

        init = function () {
            return that;
        },

        createCategories = function (parseCategories) {
            return LostAndFound.Model.ParseHelper.copyArray(parseCategories);
        },

        getItemTypeForId = function (id) {
            return categoriesHashMap[id];
        },

        getItemTypes = function (callback) {
            if (LostAndFound.Model.Categories && LostAndFound.Model.Categories.length >0) {
                callback(LostAndFound.Model.Categories);
                return;
            }

            var types = LostAndFound.Model.Categories = [];

            var query = new Parse.Query(Category);
            query.find({
                success: function (results) {
                    var categories = createCategories(results);
                    categories.forEach(function (category) {
                        categoriesHashMap[category.id] = category;
                        types.push(category);
                    });
                    callback(categories);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        };

    that.getItemTypeForId = getItemTypeForId;
    that.getItemTypes = getItemTypes;
    that.init = init;
    return that;

}());

