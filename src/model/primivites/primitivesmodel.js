///#source 1 1 /src/model/primivites/comment.js
LostAndFound.Model.Comment = function() {
    var id, user, content;
}
///#source 1 1 /src/model/primivites/report.js
LostAndFound.Model.Report = function() {
    this.lng = null;
    this.lat = null;
    this.id;
    this.imageURL = null;
    this.description = null;
    this.title = null;
    this.type = null;
    this.category = null;
    this.reward = null;
    this.when = null;
    this.email = null;
    this.phoneNumber = null;

    this.getCategoryName = function () {
        if (this.category) {
            return this.category.shortname;
        }
        return undefined;
    }

    this.getType = function() {
        return this.type;
    }
}
///#source 1 1 /src/model/primivites/sector.js
LostAndFound.Model.Sector = function (longMin, longMax, latMin, latMax) {
    this.longMin = longMin;
    this.longMax = longMax;
    this.latMin = latMin;
    this.latMax = latMax;
}
///#source 1 1 /src/model/primivites/user.js
LostAndFound.Model.User = function() {
    var id, imageURL, info, name;
}
///#source 1 1 /src/model/primivites/itemtype.js
LostAndFound.Model.ItemType = function(id, name, shortname) {
    this.id = id;
    this.name = name;
    this.shortname = shortname;
}
