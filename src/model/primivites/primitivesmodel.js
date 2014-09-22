///#source 1 1 /src/model/primivites/comment.js
LostAndFound.Model.Comment = function() {
    var id, user, content;
}
///#source 1 1 /src/model/primivites/report.js
LostAndFound.Model.Report = function() {
    var lng, lat, id, imageURL, description, title, type, category;
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
LostAndFound.Model.ItemType = function(id, name) {
    this.id = id;
    this.name = name;
}
