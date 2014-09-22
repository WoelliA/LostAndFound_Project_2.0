LostAndFound.Views.Icon = function (report) {
    /// <param name="report" type="LostAndFound.Model.Report"></param>
    this.url = "/res/images/mapicons/" + report.getCategoryName() + "_" + report.getType() + ".png";

    this.size = new google.maps.Size(48,60);
};