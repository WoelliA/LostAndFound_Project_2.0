LostAndFound.Views.Icon = function (report) {
    /// <param name="report" type="LostAndFound.Model.Report"></param>

    var itemType = report.getCategoryName();
    var reportType = report.getType();

    this.url = "/res/images/mapicons/" + itemType + "_" + reportType + ".png";

    this.size = new google.maps.Size(48, 60);
};