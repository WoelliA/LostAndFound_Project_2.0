///#source 1 1 /src/model/dummy/primivites/dummyprimivitesbundle.js
///#source 1 1 /src/model/dummy/primivites/dummyComment.js

LostAndFound.Model.Dummy.DummyComment = function (num) {
    /// <param name="num" type="Number"></param>
    /// <param name="request" type="LostAndFound.Model.ReportsRequest"></param>
    LostAndFound.Model.Comment.call(this);

    this.id = num;
    this.user = new LostAndFound.Model.Dummy.DummyUser(this.id);
    this.content = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam";
}
///#source 1 1 /src/model/dummy/primivites/dummyReport.js
dummyreportscreated = 0;
LostAndFound.Model.Dummy.DummyReport = function (num, request) {
    /// <param name="num" type="Number"></param>
    /// <param name="request" type="LostAndFound.Model.ReportsRequest"></param>
    LostAndFound.Model.Report.call(this);

    dummyreportscreated++;

    this.getRandomCoords =  function () {
        /// <param name="sector" type="LostAndFound.Model.ReportsRequest"></param>   
        var lat = 49.0167;
        var lng = 12.0833;

        if (request && request.sector) {
            var sector = request.sector;


            var longfactor = Math.random();
            var latFactor = Math.random();
            lng = sector.longMin + ((sector.longMax - sector.longMin) * longfactor);
            lat = sector.latMin + ((sector.latMax - sector.latMin) * latFactor);
        }


        return { lng: lng, lat: lat };
    };

    this.getRandomType = function () {
        var items = request.itemTypes;
        var item = items[Math.floor(Math.random() * items.length)];
        return LostAndFound.Model.Dummy.Config.itemTypes[item];
    }

    var coords = this.getRandomCoords();

    this.category = this.getRandomType();
    this.type = request.type;
    this.id = dummyreportscreated;
    this.lng = coords.lng;
    this.lat = coords.lat;
    this.title = "Dummy Title " + this.id;
    this.description = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit";
    this.imageURL = "http://bikechicago.info/securebike.jpg";

    this.getCategoryName = function getCategoryName() {
        return this.category;
    };

    this.getType = function getType() {
        console.log(this.type);
        if (this.type)
            return this.type;
        return "lost";
    };
}
///#source 1 1 /src/model/dummy/primivites/dummyUser.js
dummyreportscreated = 0;
LostAndFound.Model.Dummy.DummyUser = function (num) {
    /// <param name="num" type="Number"></param>
    /// <param name="request" type="LostAndFound.Model.ReportsRequest"></param>
    LostAndFound.Model.User.call(this);

    this.id = num;
    this.name = "Dummy User " + this.id;
    this.info = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit";
    this.imageURL = "http://bikechicago.info/securebike.jpg";
}

///#source 1 1 /src/model/dummy/userModel.js
LostAndFound.Model.Dummy.UserModel = (function () {
    var that = {},

        init = function () {

            return that;
        };

    that.init = init;
    return that;

}());
///#source 1 1 /src/model/dummy/config.js
LostAndFound.Model.Dummy.Config = {
    delay: 1000,
    itemTypes: {
        0: "backpack",
        1: "bike",
        2: "handbag",
        3: "jacket",
        4: "key",
        5: "laptop",
        6: "phone",
        7: "stick",
        8: "suitcase",
        9: "wallet"
    },
    itemTypeLength: 10
};
///#source 1 1 /src/model/dummy/geoModel.js
LostAndFound.Model.Dummy.GeoModel = LostAndFound.Model.GeoModel;
///#source 1 1 /src/model/dummy/reportsModel.js
LostAndFound.Model.Dummy.ReportsModel = (function () {
    var that = {},
        allReports = [],
        reports = [],


        init = function() {
            console.log("dummymodel init");
            return that;
        },

        saveReport = function(report, callback) {
            setTimeout(function () {
                console.log("dummy save report done");
                callback.success();
            }, LostAndFound.Model.Dummy.Config.delay);
        },

        getReport = function(reportId, callback) {
            setTimeout(function() {
                callback(allReports[reportId]);
            }, LostAndFound.Model.Dummy.Config.delay);
        },

        getReportsCount = function(request, callbackObject) {
            setTimeout(function () {
                callbackObject.success(21);
            }, LostAndFound.Model.Dummy.Config.delay);
        },

        getReports = function (request, callback) {
            /// <param name="request" type="LostAndFound.Model.ReportsRequest">The request.</param>
            console.log("getreqports", request);
            setTimeout(function () {
                var oldReports = reports;
                reports =[];
                for (var i = 0; i < request.pageSize; i++) {
                    var report = new LostAndFound.Model.Dummy.DummyReport(i, request);
                    allReports[report.id] = report;
                    reports.push(report);
                }
                callback(reports, oldReports);
            }, LostAndFound.Model.Dummy.Config.delay);
        };

    that.getReportsCount = getReportsCount;
    that.saveReport = saveReport;
    that.getReport = getReport;
    that.getReports = getReports;
    that.init = init;
    return that;
}());
///#source 1 1 /src/model/dummy/commentsModel.js
LostAndFound.Model.Dummy.CommentsModel = (function () {
    var that = {},
       
        init = function () {
            return that;
        },
        
        getReportsComments = function (request, callback) {
            /// <param name="request" type="LostAndFound.Model.CommentsRequest"></param>
            setTimeout(function() {
                var comments = [];
                for (var i = 0; i < request.count; i++) {
                    console.log(LostAndFound.Model.Dummy.DummyComment);
                    var id = request.offset + i;
                    var comment = new LostAndFound.Model.Dummy.DummyComment(id);
                    comments.push(comment);
                }
                callback(comments);
            }, LostAndFound.Model.Dummy.Config.delay);


        };

    that.getReportsComments = getReportsComments;
    that.init = init;
    return that;

}());
///#source 1 1 /src/model/dummy/configModel.js
LostAndFound.Model.Dummy.ConfigModel = (function () {
    var that = {},

         types,

        init = function () {
            return that;
        },

        getItemTypeForId = function (id) {
            return types[id];
        },

        getItemTypes = function (callback) {
            setTimeout(function () {
                var config = LostAndFound.Model.Dummy.Config;
                if (!types) {
                    types = [];

                    for (var i = 0; i < config.itemTypeLength; i++) {
                        var name = config.itemTypes[i];
                        var type = new LostAndFound.Model.ItemType(i, name,name);
                        types[i] = type;
                    }
                }
                callback(types);
            }, LostAndFound.Model.Dummy.Config.delay);
        };

    that.getItemTypeForId = getItemTypeForId;
    that.getItemTypes = getItemTypes;
    that.init = init;
    return that;

}());
