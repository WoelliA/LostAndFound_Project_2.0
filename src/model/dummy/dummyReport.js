LostAndFound.Model.Dummy.DummyReport = function(num, request) {
    /// <param name="num" type="Number"></param>
    /// <param name="request" type="LostAndFound.Model.ReportsRequest"></param>
    LostAndFound.Model.Report.call(this);


    this.getRandomCoords =  function (sector) {
        /// <param name="sector" type="LostAndFound.Model.Sector"></param>   
        var longfactor = Math.random();
        var latFactor = Math.random();

        var lng = sector.longMin + ((sector.longMax - sector.longMin) * longfactor);
        var lat = sector.latMin + ((sector.latMax - sector.latMin) * latFactor);
        return { lng: lng, lat: lat };
    };

    var coords = this.getRandomCoords(request.sector);
    this.lng = coords.lng;
    this.lat = coords.lat;

}