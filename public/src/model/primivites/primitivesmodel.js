﻿LostAndFound.Model.Comment = function() {
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
